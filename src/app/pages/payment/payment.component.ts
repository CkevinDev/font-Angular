import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StripeCardComponent, StripeCardExpiryComponent, StripeService } from 'ngx-stripe';
import { ProductoOrder } from 'src/app/models/producto-order';
import { OrdersService } from 'src/app/services/orders.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ModalComponent } from '../modal/modal.component';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { Router } from '@angular/router';
import { PaymentIntentDto } from 'src/app/models/payment-intent-dto';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  cardOptions: StripeCardElementOptions= {
    iconStyle: 'solid',

    style: {
      base: {

        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es',
  };

  public stripeTest = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  constructor(
    private ordersService:OrdersService,
    private paymentService:PaymentService,
    public modalService:NgbModal,
    private stripeService: StripeService,
    private toaster:ToastrService,
    private router:Router
  ) { }

  orders:ProductoOrder[] = []
  pagoTotal:number = 1;
 
  ngOnInit(): void {

    //Observer for view our data from service OrderService
    this.ordersService.disparadorOrders.subscribe(
      data=>{ 
        this.orders = data;
      }
    )
    //Observer get our TotalProducto
    console.log("aqui debe estar el total");
    
    this.ordersService.disparadorTotal.subscribe(
      data=>{
        this.pagoTotal = data;
        console.log(this.pagoTotal);
      }
    )
  }

  abrirModal(id:string){
    const modalRef = this.modalService.open(ModalComponent);
  }

  createToken(): void {
    console.log(this.pagoTotal);
    
    const name = this.stripeTest.get('name')!.value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          const paymentIntentDto:PaymentIntentDto = {
            token:result.token.id,
            amount: 100,
            currency:'PEN',
            description:"compra de productos plasticos"
          };
          this.paymentService.pagar(paymentIntentDto).subscribe(
            data=>{
              this.abrirModal(data[<any>'id']);
              this.router.navigate(['/confirmacion'])
            }
          );

        } else if (result.error) {
          this.toaster.error(result.error.message,'Fail',{
            timeOut:3000
          });
          console.log(result.error.message);
        }
      });
  }

}
