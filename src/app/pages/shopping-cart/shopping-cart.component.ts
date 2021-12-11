import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { ProductoOrder } from 'src/app/models/producto-order';
import { ProductoOrders } from 'src/app/models/producto-orders';
import { CarritoService } from 'src/app/services/carrito.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  orderFinished!: boolean;
  orders!: ProductoOrders;
  total!: number;
  sub!: Subscription;
  cantidad!:number;


  //hoy
  productOrders: ProductoOrder[] = [];
  products: Producto[] = [];
  selectedProductOrder!: ProductoOrder;
  private shoppingCartOrders!: ProductoOrders;
  productSelected: boolean = false;
  //hoy

  @Output() onOrderFinished!: EventEmitter<boolean>;

constructor(
  private carritoService:CarritoService,
  private orderService:OrdersService


) { 
  this.total = 0;
  this.orderFinished = false;
  this.onOrderFinished = new EventEmitter<boolean>();
}



ngOnInit(): void {
  this.orders = new ProductoOrders();    
  this.loadCart();
  this.loadTotal();
  this.loadCantidad();

}

private calculateTotal(products: ProductoOrder[]): number {
  let sum = 0;
  let cantidad = 0;
  products.forEach(value => {
      sum += (value.producto.precio * value.quantity);
      cantidad += 1;
  });
  return sum;
}

private calculateCantidad(products: ProductoOrder[]): number {
  let cantidad = 0;
  products.forEach(value => {
      cantidad += 1;
  });
  return cantidad;
}

loadCantidad(){
  this.sub = this.carritoService.OrdersChnaged.subscribe(()=>{
    this.cantidad = this.calculateCantidad(this.orders.productoOrders)
  })
}


ngOnDestroy() {
  this.sub.unsubscribe();
}

finishOrder() {
  this.orderFinished = true;
  this.carritoService.Total = this.total;
  this.onOrderFinished.emit(this.orderFinished);

  this.orderService.disparadorOrders.emit({
    data:this.orders
  })
  this.orderService.disparadorTotal.emit({
    data:this.total
  })
}

loadTotal() {
  this.sub = this.carritoService.OrdersChnaged.subscribe(() => {
      this.total = this.calculateTotal(this.orders.productoOrders);
  });
}



loadCart() {
 
  this.sub = this.carritoService.ProductoOrderChanged.subscribe(() => {
      let productOrder = this.carritoService.SelectedProductOrder;
      if (productOrder) {
          this.orders.productoOrders.push(new ProductoOrder(
              productOrder.producto, productOrder.quantity));
              console.log(this.orders);
      }
      this.carritoService.ProductOrders = this.orders;
      this.orders = this.carritoService.ProductOrders;
      this.total = this.calculateTotal(this.orders.productoOrders);
  });
}

reset() {
  this.orderFinished = false;
  this.orders = new ProductoOrders();
  this.orders.productoOrders = []
  this.loadTotal();
  this.total = 0;
}

removeFromCart(productOrder:ProductoOrder){
let index = this.getProductIndex(productOrder.producto);
if(index>-1){
  this.shoppingCartOrders.productoOrders.splice(
    this.getProductIndex(productOrder.producto),1
  )
}
this.carritoService.ProductOrders = this.shoppingCartOrders;
this.shoppingCartOrders=this.carritoService.ProductOrders;
this.productSelected = false;
}

getProductIndex(product: Producto): number {
    return this.carritoService.ProductOrders.productoOrders.findIndex(
        value => value.producto === product);
}

isProductSelected(product: Producto): boolean {
    return this.getProductIndex(product) > -1;
}


loadOrders() {
    this.sub = this.carritoService.OrdersChnaged.subscribe(() => {
        this.shoppingCartOrders = this.carritoService.ProductOrders;
    });
}




}



