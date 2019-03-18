import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  id: string;
  loggedIn: boolean = false;

  constructor (private userservice: UserService) { }

  ngOnInit() {
    this.start();
  }
    
  start(){
      this.userservice.isLoggedIn.subscribe(res => {
        this.loggedIn = res;
      });
      this.userservice.username.subscribe(res => {
        this.id = res;
      })
    }

  logOutBtn():void {
    this.userservice.logOut().subscribe(res =>{
      window.location.replace("/")
    }) 
  }
}
