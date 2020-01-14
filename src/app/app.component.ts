import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OrdersService } from './services/orders.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Producto } from './interfaces/producto';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild("btnClose") btnClose:ElementRef;
  total:number =0;
  ordenCompra:number;
  producto: Producto = {};
  img:string= "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR0T6Uk-oCEgUVXE2QS4kaqtkZTOpggDRJcEYdz8YzXNc_YV2pX";
  order:any;

  constructor(private ordersService: OrdersService){}

  ngOnInit() {
    this.getOrders();
  }

  guardarProduct(form: NgForm) {
    this.producto.id = Date.now();
    this.producto.subTotal = this.producto.price;
    this.producto.imageUrl = this.img;
    this.order.push(this.producto);
    this.calcTotal();
    console.log(this.producto);
    this.producto = {};
    Swal.fire('¡Exitoso!', 'Producto agregado a la orden', 'success');
    this.btnClose.nativeElement.click();
  }

  getOrders() {
    this.ordersService.getOrders().subscribe(
      data => {
        this.ordenCompra = data.order.id
        console.log(data);
        this.order = data.order.items;
        Array.prototype.forEach.call(this.order, element => {
          element.subTotal = element.price;
        });
        this.calcTotal();
        console.log(this.order);
      },
      error => console.log('error', error)
    );
  }

  calcCosto(id, value) {
    Array.prototype.forEach.call(this.order , element => {
      if(element.id === id) element.subTotal = value * element.price;
    });
    this.calcTotal();
  }

  calcTotal() {
    this.total = 0;
    Array.prototype.forEach.call(this.order, element => {
      this.total = this.total + parseFloat(element.subTotal);
    });
  }

  pay()
  {
  Swal.fire('Compra realizada', 'Su metodo de pago fue aceptado', 'success');
  }
}
