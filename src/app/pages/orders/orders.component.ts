import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductoOrders } from 'src/app/models/producto-orders';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

    orders!: ProductoOrders;
    total!: number;
    paid!: boolean;
    sub!: Subscription;

  constructor(
    private carritoService:CarritoService
  ) { }

  ngOnInit(): void {
    console.log(this.orders);
    this.paid = false;
    this.sub = this.carritoService.OrdersChnaged.subscribe(() => {
        this.orders = this.carritoService.ProductOrders;
    });
    this.loadTotal();
  }

  pay() {
    this.paid = true;
    this.carritoService.saveOrder(this.orders).subscribe();
  }

  loadTotal() {
      this.sub = this.carritoService.totalChanged.subscribe(() => {
          this.total = this.carritoService.Total;
      });
  }
}
