import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.component.html',
  styleUrls: ['./update-producto.component.css']
})
export class UpdateProductoComponent implements OnInit {

  producto!: Producto;

  constructor(
    private productoService:ProductoService,
    private activatedRute:ActivatedRoute,
    private toaster:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRute.snapshot.params.id;
    this.productoService.detail(id).subscribe(
      data=>{
        this.producto=data
      },err =>{
        this.toaster.error(err.error.mensaje,'Fail',{
          timeOut:3000
        });
        this.router.navigate(['/admin-list'])
      }
    )
  }


  onUpdate():void{
    const id = this.activatedRute.snapshot.params.id;
    this.productoService.update(id,this.producto).subscribe(
      data=>{
        this.toaster.success('Producto actualizado','OK',{
          timeOut:3000
        })
        this.router.navigate(['admin-list']);
      },err => {
        this.toaster.error(err.error.mensaje,'Fail',{
          timeOut:3000
        })
      }
    )
  }

}
