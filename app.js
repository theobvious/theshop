const express = require("express");
const cors = require('cors')
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var path = require('path')
var fs = require('fs');
var upload = require('express-fileupload');
var session = require('express-session');

app.use(express.static('uploads'));
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json())
app.use(upload());


app.use(express.static('dist/theshop'));

app.get('/', (req, res) => {
  res.sendFile('/index.html', {
    root: './dist/theshop/'
  });
});


var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'theshop'
});

con.connect((err) => {
  if (err) {
    console.log("Cannot connect to database");
    console.log(err);
    return;
  }
  console.log('Connected');
});

app.use(session({
  secret: 'gates',
  resave: true,
  saveUninitialized: true,
  cookie: {
    expires: new Date(Date.now() + 2000000),
    maxAge: 2000000
  }
}));

app.get('/getcategories', (req, res) => {
  con.query(`select distinct category from products`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  })
})

app.get('/getbrooms', (req, res) => {
  con.query(`select * from products where category='brooms'`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  });
});

app.get('/getpets', (req, res) => {
  con.query(`select * from products where category='pets'`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  });
});

app.get('/getwands', (req, res) => {
  con.query(`select * from products where category='wands'`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  });
});

app.get('/getpotions', (req, res) => {
  con.query(`select * from products where category='potions'`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  });
});

app.get('/getallproducts', (req, res) => {
  con.query(`select * from products`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  });
});

app.post('/getproduct', (req, res) => {
  con.query(`select * from products where id=${req.body.id}`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.send(data[0]);
    }
  });
})

app.get('/users', (req, res) => {
  con.query(`select * from users`, (err, rows) => {
    if (err)
      console.log(err);
    else
      res.send();
  });
});

app.post('/user', (req, res) => {
    req.session.date = req.body.date;
  con.query(`select * from users where username='${req.body.username}' && password='${req.body.password}'`, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      if (rows.length > 0) {
        req.session.role = rows[0].role;
        req.session.username = rows[0].username;
        req.session.name = rows[0].name;
        req.session.authenticated = true;
        res.send(rows[0]);
      } else {
        res.status(400).send('Username and password are incorrect');
      }
    }
  });
});

app.post('/checkexist', (req, res) => {
  con.query(`select * from users where tz=${req.body.tz}`, (err, rows) => {
    if (err)
      console.log(err);
    else if (rows.length > 0) {
      res.send("1");
    } else if (rows.length < 1) {
      res.send("2");
    }
  })
})

app.post('/newuser', (req, res) => {
  con.query(`insert into users (username, password, email, tz, name, city, street, role) 
    values 
    ("${req.body.username}", "${req.body.password}", "${req.body.email}", ${req.body.tz}, "${req.body.name}", "${req.body.city}", "${req.body.street}", "${req.body.role}")`, (err) => {
    if (err)
      console.log(err);
    else res.send();
  })
})

app.get('/cartcheck', (req, res) => {
    con.query(`select * from carts where user='${req.session.name}' && done='0'`, (err, rows) => {
        if (err)
            console.log(err);
        else if (rows.length > 0) {
          console.log(rows[0]);
          req.session.cartid = rows[0].id;
          con.query(`select * from cartcontents where cartId=${req.session.cartid}`, (err, rows)=>{
            if (err)
              console.log(err);
            else if(rows.length > 0) {
              res.send('' + req.session.cartid);
            } else if(rows.length < 1) {
              con.query(`update carts set done='${req.body.date}' where id=${req.session.cartid}`, (err) => {
                if (err) console.log(err);
                else res.send('2');
              })
            }
          })      
        } else {
            con.query(`insert into carts (user, date, done) values ('${req.session.name}', '${req.session.date}', '0')`, (err, result) => {
                if (err)
                    console.log(err);
                else {
                    req.session.cartid = result.insertId;
                    console.log('Cart created '+result.insertId);
                    res.send('2');
                }
            });
        }
    })
});

app.post('/closecart', (req, res) => {
  con.query(`update carts set done='1' where id=${req.body.id}`, (err) => {
    if (err)
      console.log(err)
    else {
      console.log("Done");
      con.query(`delete from cartcontents where cartId=${req.body.id}`, (err) => {
        if (err)
          console.log(err)
        else {
          delete req.session['cartid'];
          res.send();
        }
      })
    }
  })
})

app.post('/continuecart', (req, res) => {
  con.query(`update carts set date='${req.body.date}' where id=${req.session.cartid}`, (err) => {
    if (err) console.log(err);
    else res.send();
  })
})

app.get('/cartproducts', (req, res) => {
  con.query(`select * from cartcontents where cartId=${req.session.cartid}`, (err, rows) => {
    if (err)
      console.log(err);
    else if (rows.length > 0) {
      res.send(rows[0].products);
    }
  })
})

app.post('/product', (req, res) => {
    con.query(`select * from cartcontents where cartId='${req.session.cartid}'`, (err, rows) => {
        if (err) {
            console.log(err);
        } else if (rows.length < 1) {
            con.query(`insert into cartcontents (cartId, products) values(${req.session.cartid}, '${req.body.products}')`, (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log('Cart updated with '+req.body.products);
                }
            })
        } else if (rows.length > 0) {
            con.query(`update cartcontents set products='${req.body.products}' where cartId=${req.session.cartid}`, (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Cart updated');
                    res.send();
                }
            })
        }
    });
});

app.post('/editproduct', (req, res) => {
  con.query(`update products set name='${req.body.name}', price=${req.body.price}, img='${req.body.img}' where id=${req.body.id}`,(err)=>{
    if (err)
      console.log(err);
    else 
      res.send();
  })
})

app.post('/sendproduct', (req, res)=>{
  con.query(`insert into products (name, price, category, img) values ('${req.body.name}', ${req.body.price}, '${req.body.category}', '${req.body.img}')`, (err)=>{
    if (err) console.log(err);
    else res.send();
  })
})

app.post('/order', (req, res) => {
  con.query(`insert into orders (date, user, city, street, total) values ('${req.body.date}', '${req.body.user}', '${req.body.city}', '${req.body.street}', ${req.body.total})`, (err) => {
    if (err)
      console.log(err);
    else
      res.send();
  })
})

app.post('/upload', (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }
  let newimg = req.files.fileKey;
  let filename = req.files.fileKey.name;
  newimg.mv(path.join('./uploads',filename), (err) => {
    if (err)
      return res.status(500).send(err);
    res.json(filename);
  });
});
  
app.post('/logout', (req, res) => {
  console.log('Logged out');
  req.session.destroy();
  res.end();
});

app.get('*', (req, res) => {
  res.sendFile('/index.html', {
    root: './dist/theshop/'
  });
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
