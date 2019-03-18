import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AuthGuard } from './services/auth-guard.service';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';
import { CartService } from './services/cart.service';
import { DateFormatPipe } from './dateFormat.pipe';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddProductComponent } from './components/admin/addproduct/addproduct.component';
import { EditProductComponent } from './components/admin/editproduct/editproduct.component';
import { ShopComponent } from './components/shop/shop.component';
import { WandsComponent } from './components/shop/shop-wands/wands.component';
import { PetsComponent } from './components/shop/shop-pets/pets.component';
import { PotionsComponent } from './components/shop/shop-potions/potions.component';
import { BroomsComponent } from './components/shop/shop-brooms/brooms.component';
import { CartComponent } from './components/cart/cart.component';
import { RetrieveCartComponent } from './components/cart/retrievecart/retrievecart.component';
import { CheckoutComponent } from './components/cart/checkout/checkout.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'find', redirectTo: 'search'},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent,  canActivate: [AuthGuard],
    children: [
      {path: 'editproduct/:id', component: EditProductComponent},
      {path: 'addproduct', component: AddProductComponent}
    ]},
  {path: 'register', component: RegisterComponent},
  {path: 'cart', component: CartComponent},
  {path: 'activecart', component: RetrieveCartComponent},
  {path: 'checkout', component: CheckoutComponent},
  {
    path: 'shop',
    component: ShopComponent,
    children: [
      {path: '', component: WandsComponent},
      {path: 'wands', component: WandsComponent}, 
      {path: 'pets', component: PetsComponent}, 
      {path: 'potions', component: PotionsComponent}, 
      {path: 'brooms', component: BroomsComponent}
    ]
  },
];

export class MyRouteReuseStrategy implements RouteReuseStrategy {

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): boolean {
    return false;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    return false;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return false;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    ShopComponent,
    WandsComponent,
    PetsComponent,
    PotionsComponent,
    BroomsComponent,
    CartComponent,
    AddProductComponent,
    EditProductComponent,
    RetrieveCartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule
  ],
  providers: [DataService, CartService, UserService, AuthGuard, DateFormatPipe, 
    {provide: APP_BASE_HREF, useValue : '/' },
    {provide: RouteReuseStrategy, useClass: MyRouteReuseStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
