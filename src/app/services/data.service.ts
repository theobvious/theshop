import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: Http) { }

getAllProducts(): Observable<any> {
  return this.http.get('/getallproducts');
}

  getBrooms(): Observable<any> {
    return this.http.get('/getbrooms');
  }

  getWands(): Observable<any> {
    return this.http.get('/getwands');
  }

  getPets(): Observable<any> {
    return this.http.get('/getpets');
  }

  getPotions(): Observable<any> {
    return this.http.get('/getpotions');
  }

  getProduct(id): Observable<any> {
    return this.http.post('/getproduct', id);
  }

  getCategories(): Observable<any> {
    return this.http.get('/getcategories');
  }

  editProduct(product): Observable<any> {
    return this.http.post('/editproduct', product);
  }

  upload(uploading: File) : Observable<any> {  
    let data = new FormData();
    data.set('fileKey', uploading, uploading.name);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'image/jpg'    
      })
    };
    return this.http.post('/upload', data);
  }

  sendProduct(product): Observable<any> {
    return this.http.post('/sendproduct', product);
  }
}