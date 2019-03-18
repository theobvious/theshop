import { CartService } from './../../../services/cart.service';
import { product } from './../../../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { DataService } from './../../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wands',
  templateUrl: './wands.component.html',
  styleUrls: ['./wands.component.css']
})
export class WandsComponent implements OnInit {
  @Input() wand : product;
  wands:any;

  constructor(private getdata: DataService, private cartService : CartService) { }

  ngOnInit() {
    this.getwands();
  }
  
  getwands() {
    this.getdata.getWands()
    .subscribe(
      res => {
        this.wands = res.json();
      });
  }

  addToCart(wand : product) {
    this.cartService.addProduct(wand);
}
}