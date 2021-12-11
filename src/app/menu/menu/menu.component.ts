import { Component, OnInit } from '@angular/core';
import { faList,faPlus,faUser,faPowerOff,faTable,faHome,faUsers,faHandshake,faEnvelope, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Subscription } from 'rxjs';
import { ProductoOrder } from 'src/app/models/producto-order';
import { ProductoOrders } from 'src/app/models/producto-orders';
import { CarritoService } from 'src/app/services/carrito.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  faList = faList;
  faPlus = faPlus;
  faUser = faUser;
  faPowerOff = faPowerOff;
  faTable=faTable;
  faHome=faHome;
  faUsers=faUsers;
  faHandshake=faHandshake;
  faEnvelope=faEnvelope;
  faShoppingCart=faShoppingCart;

  cantidad:number= 0;

  isLogged = false;
  usuario = "";

  roles:string[]=[];
  isAdmin = false;


  orders!: ProductoOrders;
  sub!: Subscription;

  constructor(private tokenService:TokenService, private carritoService:CarritoService) { }



  ngOnInit(): void {
    this.loadCantidad()
    if(this.tokenService.getToken()){
      this.isLogged=true;
      this.getUsuario()
    }else{
      this.isLogged=false;
    }

    this.roles=this.tokenService.getAuthorities();
    this.roles.forEach(rol=>{
      console.log(rol);
      
      if(rol === "ROLE_ADMIN"){
        this.isAdmin=true;
      }
    })
  }

  getUsuario(){
    this.usuario=this.tokenService.getUsername();
  }

  onLogOut():void{
    this.tokenService.logOut();
    window.location.reload();
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
      alert(this.cantidad)
    })
  }

}
