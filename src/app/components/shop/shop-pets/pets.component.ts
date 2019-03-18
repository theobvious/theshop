import { CartService } from './../../../services/cart.service';
import { product } from './../../../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { DataService } from './../../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  @Input() pet : product;  
  pets:any;

  constructor(private getdata: DataService, private cartService: CartService) { }

  ngOnInit() {
    this.getpets();
  }
  getpets() {
    this.getdata.getPets()
    .subscribe(
      res => {
        this.pets = res.json();
      });
  }

  addToCart(pet : product) {
    this.cartService.addProduct(pet);
}

}
