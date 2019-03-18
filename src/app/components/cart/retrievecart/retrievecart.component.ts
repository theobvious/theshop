import { Router } from '@angular/router';
import { product } from '../../../models/product';
import { CartService } from './../../../services/cart.service';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retrievecart',
  templateUrl: './retrievecart.component.html',
  styleUrls: ['./retrievecart.component.css']
})
export class RetrieveCartComponent implements OnInit {

  cartid: number;
  products: product[];

  constructor(private getdata: DataService, private cartservice: CartService, private router: Router) { }

  ngOnInit() {
    this.cartid = +sessionStorage.getItem('cartid');
    this.cartservice.fetchCartContents()
      .subscribe(res => {
          this.products = res.json();
      })
  }

  continue() {
    this.cartservice.continueCart(this.products);
    this.router.navigate(['/cart']);
  }

  reset() {
    this.cartservice.resetCart({id: this.cartid});
    this.router.navigate(['/shop']);
  }
}
