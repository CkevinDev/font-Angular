import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { ToastrService } from "ngx-toastr";
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-new-producto',
  templateUrl: './new-producto.component.html',
  styleUrls: ['./new-producto.component.css']
})
export class NewProductoComponent implements OnInit {

    nombre: string = "botella";
    descripcion: string ="botella transparente";
    imagenUrl: string="http://www.globalplastic.pe/images/products/Botellas/Botellas_Alcoholera/Bot-alcoholera-125ml.png";
    material : string="PET";
    precio : number= 0.5;
    cantidad : number = 1; 
    usuario !:Usuario;

  constructor(private productoService:ProductoService,
    private toaster:ToastrService,
    private router:Router,
    private tokenService:TokenService,
    private authService:AuthService
    ) { }

    

  ngOnInit(): void {
    this.authService.getUserByUsername(this.tokenService.getUsername()).subscribe(
        data=>{
          this.usuario = data;
        }
      )
  }

  create(){
    const producto = new Producto(
      this.nombre,
      this.descripcion,
      this.imagenUrl,
      this.material,
      this.precio,
      this.cantidad,
      this.usuario
    )

    this.productoService.create(producto).subscribe(
      data=>{
        this.toaster.success('Producto creado','OK',{
          timeOut:3000
        })
        this.router.navigate(['lista']);
      },err => {
        this.toaster.error(err.error.mensaje,'Fail',{
          timeOut:3000
        })
      }
    )
  }

}
