import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { faEdit,faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {


  FaEdit = faEdit;
  FaTrashAlt = faTrashAlt;

  productos:Producto[] = []

  constructor(
    private productoService:ProductoService,
    private toaster:ToastrService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.listarProductos()
  }

  listarProductos():void{
    this.productoService.lista().subscribe(
      data=>{
        this.productos = data;
      },
      err =>{
        console.log(err);
        
      }
    )
  }

  borrar(id:number){

    this.productoService.delete(id).subscribe(
      data=>{
        this.toaster.success('Producto eliminado','OK',{
          timeOut:3000
        })
        window.location.reload()
      },err => {
        this.toaster.error(err.error.mensaje,'Fail',{
          timeOut:3000
        })
      }
    )
  }

}
