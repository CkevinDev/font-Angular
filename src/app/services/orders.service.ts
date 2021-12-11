import { EventEmitter, Injectable, Output } from '@angular/core';
import { ProductoOrders } from '../models/producto-orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  @Output() disparadorOrders:EventEmitter<any> = new EventEmitter();
  @Output() disparadorTotal:EventEmitter<any> = new EventEmitter();
  constructor() { }
}
