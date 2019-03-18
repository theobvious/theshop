import { product } from '../models/product';
import { CartState } from '../models/cartState';

import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subject, of, BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class CartService {
  currUser : string;
  today : any;
  cartSubject = new BehaviorSubject<CartState>({done: 0, products: [], totalPrice: 0, date: '', name: ''});
  products : product[] = [];
  totalPrice : number = 0;

  constructor(private http : Http, private userservice : UserService) { 
    this.currUser = sessionStorage.getItem('name');
    this.today = sessionStorage.getItem('date');
   }

    addProduct(product:product) {
      var inCart = this.checkInCart(product.name);
      if (inCart == null){
        this.products.push(product);
        var a = this.products.indexOf(product);
      }
      else {
        inCart.quantity += product.quantity;
      }
      this.totalPrice += (product.price*product.quantity);
      this.cartSubject.next(<CartState>{done: 0, products: this.products, totalPrice: +this.totalPrice, date: this.today, name: this.currUser});
      this.sendCart({products: JSON.stringify(this.products), date: this.today, user: this.currUser});
    }

    checkInCart(name:string) {
      for(var i=0; i< this.products.length; i++) {
        if(this.products[i].name === name){
            return this.products[i];
        }
      }
        return null;
    }

    sendCart(data) {
      this.http.post('/product', data).subscribe(res => console.log(res));
    }

    removeProduct(product) {
      var inCart = this.checkInCart(product.name);
      if (inCart !== null) {
        inCart.quantity -= 1;
        if (inCart.quantity == 0) {
          this.products = this.products.filter(item => item !== product);
        }
      }
      this.totalPrice -= +product.price;
      this.cartSubject.next(<CartState>{done: 0, products: this.products, totalPrice: +this.totalPrice, date: this.today, name: this.currUser});
      
      if (this.products.length < 1) {
        this.resetCart({id: sessionStorage.getItem('cartid')});
      } else {
        this.sendCart({products: JSON.stringify(this.products), date: this.today, user: this.currUser});
      };
    }

    getAllProducts() {
      return this.cartSubject;
    }

    checkOpenCart(){
      return this.http.get('/cartcheck');
    }

    fetchCartContents() : Observable<any>{
      return this.http.get('/cartproducts');
    }

    continueCart(data) {
      this.products = data;
      data.forEach(prod => {
        this.totalPrice += prod.price;
      });
      this.cartSubject.next(<CartState>{done: 0, products: this.products, totalPrice: +this.totalPrice, date: this.today, name: this.currUser});
      this.http.post(('/continuecart'), {products: JSON.stringify(this.products), date: this.today}).subscribe(res=> {
      });
    }

    submitOrder(data): Observable<any> {
      return this.http.post('/order', data);
    }

    resetCart(id) {
      this.http.post('/closecart', id).subscribe();
    }

}