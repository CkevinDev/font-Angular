import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ProductoOrder } from '../models/producto-order';
import { ProductoOrders } from '../models/producto-orders';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  //carritoUrl = 'http://localhost:8080/orden/'
  carritoUrl = "https://plastic-antonys.herokuapp.com/orden/"

  constructor(private httpClient:HttpClient) { }

  private productOrder!:ProductoOrder;
  private orders:ProductoOrders = new ProductoOrders();
  private total!: number;
  private cantidad!:number;


  private productOrderSubject = new Subject();
  private ordersSubject = new Subject();
  private totalSubject = new Subject();
  private cantidadSubject = new Subject();

 

  ProductoOrderChanged = this.productOrderSubject.asObservable();
  OrdersChnaged = this.ordersSubject.asObservable();
  totalChanged = this.totalSubject.asObservable();
  cantidadChanged = this.cantidadSubject.asObservable();


  public saveOrder(order:ProductoOrders):Observable<any>{
    return this.httpClient.post<any>(this.carritoUrl+`create`,order)
  }

  set SelectedProductOrder(value: ProductoOrder) {
    this.productOrder = value;
    this.productOrderSubject.next();  
  }

  get SelectedProductOrder() {
    return this.productOrder;
  }

  set ProductOrders(value: ProductoOrders) {
    this.orders = value;
    this.ordersSubject.next();
  }

  get ProductOrders() {
    return this.orders;
  }

  get Total() {
      return this.total;
  }

  set Total(value: number) {
      this.total = value;
      this.totalSubject.next();
  }

  get getCantidad(){
    return this.cantidad;
  }
  
  set Cantidad(value:number){
    this.cantidad = value;
    this.cantidadSubject.next();
  }

}
