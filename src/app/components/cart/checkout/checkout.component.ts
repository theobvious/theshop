import { Order } from './../../../models/order';
import { User } from './../../../models/user';
import { product } from './../../../models/product';
import { DataService } from './../../../services/data.service';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  order: Order = new Order(0, null, '', '', '', 0, 0);
  cart:product[];
  user: User;
  cities: string[] = [
    "London",
    "Hogwarts",
    "Hogsmeade",
    "The Burrow",
    "Godric's Hollow",
    "Little Hangleton",
    "Spinner's End",
    "Forest of Dean"
  ]
  filling: boolean = true;
  finished: boolean = false;

  constructor(private cartservice: CartService, private userservice: UserService, private getdata: DataService, private router: Router) {
    this.cartservice.cartSubject
      .subscribe(res=>{
        this.cart = res.products;
        this.order.total = +res.totalPrice;
      })
   }

  ngOnInit() {
    this.user = this.userservice.getLoggedInUser();
    this.order.user = this.user.name;
  }

  fillForm() {
    this.order.city = this.user.city;
    this.order.street = this.user.street;
  }

  backToShop() {
    this.router.navigate(['/shop']);
  }

  finishShopping() {
    console.log(this.order);
    this.cartservice.submitOrder(this.order)
      .subscribe(res => {
        console.log("Order submitted!")
      });

    this.cartservice.resetCart({id: sessionStorage.getItem('cartid')});
    this.filling = false;
    this.finished = true;
  }
}
