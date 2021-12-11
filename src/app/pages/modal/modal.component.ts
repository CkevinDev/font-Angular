import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProductoOrder } from 'src/app/models/producto-order';
import { ProductoOrders } from 'src/app/models/producto-orders';
import { OrdersService } from 'src/app/services/orders.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  orders= {};
  

  constructor(
    private ordersService:OrdersService,
    private paymentService:PaymentService,
    private toastr:ToastrService,
    private router:Router,
    public activeModal:NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.ordersService.disparadorOrders.subscribe(
      data=>{
        this.orders = data
      }
    )
    this.ordersService.disparadorTotal.subscribe(
      data=>{
        console.log("recibiendo total...",data);
      }
    )
  }

  confirmar(id:string):void{
    this.paymentService.confirmar(id).subscribe(
      data=>{
        this.activeModal.close()
        this.router.navigate(['/lista'])
      },err=>{
        this.toastr.error(err.error.message,'Fallo en el pago',{
          timeOut:3000
        });
        this.activeModal.close()
      }
    )
  }

  cancelar(id:string):void{
    this.paymentService.cancelar(id).subscribe(
      data=>{
        this.toastr.success("pago cancelado",'El pago se ha cancelado',{
          timeOut:3000
        });
        this.activeModal.close()
      },err=>{
        this.toastr.error(err.error.message,'Fallo en la cancelacion de pago',{
          timeOut:3000
        });
        this.activeModal.close()
      }
    )
  }

}
