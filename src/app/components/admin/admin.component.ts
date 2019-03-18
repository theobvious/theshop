import { UserService } from './../../services/user.service';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  brooms: any;
  pets: any;
  potions: any;
  wands: any;
  products: any;
  name: string;

  constructor(private getdata: DataService, private userservice: UserService) { }

  ngOnInit() {
    this.name = sessionStorage.getItem('name');
    this.getbrooms();
    this.getwands();
    this.getpets();
    this.getpotions();
  }
  
  getbrooms() {
    this.getdata.getBrooms()
      .subscribe(
        res => {
          this.brooms = res.json();
        });
  }

  getpets() {
    this.getdata.getPets()
      .subscribe(
        res => {
          this.pets = res.json();
        });
  }

  getpotions() {
    this.getdata.getPotions()
      .subscribe(
        res => {
          this.potions = res.json();
        });
  }
  
  getwands() {
    this.getdata.getWands()
      .subscribe(
        res => {
          this.wands = res.json();
        });
  }
}
