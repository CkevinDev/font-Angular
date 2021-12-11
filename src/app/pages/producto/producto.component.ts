import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { ProductoOrder } from 'src/app/models/producto-order';
import { ProductoOrders } from 'src/app/models/producto-orders';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductoService } from 'src/app/services/producto.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  order !:ProductoOrder;

  total:any;
  cantidad:any = 5;

    //hoy
    productOrders: ProductoOrder[] = [];
    products: Producto[] = [];
    selectedProductOrder!: ProductoOrder;
    private shoppingCartOrders!: ProductoOrders;
    sub!: Subscription;
    productSelected: boolean = false;



    //hoy
  constructor(
    private productoService:ProductoService,
    private activatedRute:ActivatedRoute,
    private toaster:ToastrService,
    private router:Router,
    private carritoService:CarritoService,
    private authService:AuthService,
    private tokenService:TokenService
  ) { }

  ngOnInit(): void {
    ///hoy
    
    this.productOrders=[]
    this.loadOrders();
    //hoy
    this.authService.getUserByUsername(this.tokenService.getUsername()).subscribe(
      data=>{
 
      }
    )

    const id = this.activatedRute.snapshot.params.id;
    this.productoService.detail(id).subscribe(
      data=>{
        this.order=new ProductoOrder(data,0)
      },err=>{
        this.toaster.error(err.error.mensaje,'Fail',{
          timeOut:3000
        });
        this.volver()
      }
    )
  }

  volver():void{
    this.router.navigate(['/lista'])
  }



  //hoy
  addToCart(order:ProductoOrder){
    this.carritoService.SelectedProductOrder = order;
    this.selectedProductOrder = this.carritoService.SelectedProductOrder;
    this.productSelected=true;
    console.log(order.quantity);
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

    reset() {
        this.productOrders = [];
        this.carritoService.ProductOrders.productoOrders = [];
        this.loadOrders();
        this.productSelected = false;
    }

    //hoy

}
