import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  token: string = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJqNENWdUR6R0RpQTJzeHUwWVlPWW5kaUU0WGtvbnNGYiIsImlhdCI6MTU2NTA0MjE1NDg5N30.7fhKSn_S18AMA8T12Ne1iK_O0yRZvvMd17J7unGGnuwN2MjjxZB306VSDqk3pQ1I-wj3iutJLhVyR3kHWkhxFw';
  url: string = 'https://eshop-deve.herokuapp.com/api/v2/orders/1885187866668';

  constructor(private http:HttpClient) { }

  getOrders() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });

    return this.http.get<any>(this.url, {headers});
  }

}
