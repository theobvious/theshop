import { CartService } from './../../../services/cart.service';
import { product } from './../../../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { DataService } from './../../../services/data.service';

@Component({
  selector: 'app-potions',
  templateUrl: './potions.component.html',
  styleUrls: ['./potions.component.css']
})
export class PotionsComponent implements OnInit {
  @Input() potion : product;
  potions:any;

  constructor(private getdata: DataService, private cartService: CartService) { }

  ngOnInit() {
    this.getpotions();
  }
  getpotions() {
    this.getdata.getPotions()
      .subscribe(res => {
        this.potions = res.json();
      });
  }

  addToCart(potion : product) {
    this.cartService.addProduct(potion);
}
}
