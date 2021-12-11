import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { ProductoOrder } from 'src/app/models/producto-order';
import { ProductoOrders } from 'src/app/models/producto-orders';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos:Producto[]=[];

    productOrders: ProductoOrder[] = [];
    products: Producto[] = [];
    selectedProductOrder!: ProductoOrder;
    private shoppingCartOrders!: ProductoOrders;
    sub!: Subscription;
    productSelected: boolean = false;

  constructor(
    private productoService:ProductoService,
    private carritoService:CarritoService

  ) { }

  ngOnInit(): void {
    this.productOrders=[]
    this.loadOrders();
    this.loadProducts();
  }

  addToCart(order:ProductoOrder){
    this.carritoService.SelectedProductOrder = order;
    this.selectedProductOrder = this.carritoService.SelectedProductOrder;
    this.productSelected=true;
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

    loadProducts() {
        this.productoService.lista()
            .subscribe(
                (products: any[]) => {
                    this.products = products;
                    this.products.forEach(product => {
                        this.productOrders.push(new ProductoOrder(product, 0));
                    })
                },
                (error) => console.log(error)
            );
    }

    loadOrders() {
        this.sub = this.carritoService.OrdersChnaged.subscribe(() => {
            this.shoppingCartOrders = this.carritoService.ProductOrders;
        });
    }

    reset() {
        this.productOrders = [];
        this.loadProducts();
        this.carritoService.ProductOrders.productoOrders = [];
        this.loadOrders();
        this.productSelected = false;
    }
}
