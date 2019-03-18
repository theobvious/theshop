import { CartService } from './../../../services/cart.service';
import { product } from './../../../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { DataService } from './../../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-brooms',
  templateUrl: './brooms.component.html',
  styleUrls: ['./brooms.component.css']
})
export class BroomsComponent implements OnInit {
  @Input() broom : product;
  brooms:any;

  constructor(private getdata: DataService, private cartService: CartService) { }

  ngOnInit() {
    this.getbrooms();
  }
  getbrooms() {
   this.getdata.getBrooms()
    .subscribe(
      res => {
        this.brooms = res.json();
      });
  }

  addToCart(broom : product) {
    this.cartService.addProduct(broom);
}

}
