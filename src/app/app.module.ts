import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/header/header.component';

//Externo
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { NewProductoComponent } from './pages/new-producto/new-producto.component';
import { UpdateProductoComponent } from './pages/update-producto/update-producto.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MenuComponent } from './menu/menu/menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminListComponent } from './pages/admin-list/admin-list.component';
import { interceptorProvider } from './interceptor/prod-interceptor.service';
import { EquipoComponent } from './pages/equipo/equipo.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { ConfirmacionComponent } from './pages/confirmacion/confirmacion.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { NgxStripeModule } from "ngx-stripe";
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ModalComponent } from './pages/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ProductosComponent,
    ProductoComponent,
    NewProductoComponent,
    UpdateProductoComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    AdminListComponent,
    EquipoComponent,
    FooterComponent,
    NosotrosComponent,
    ContactanosComponent,
    ConfirmacionComponent,
    PaymentComponent,
    ShoppingCartComponent,
    OrdersComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModalModule,
    NgxStripeModule.forRoot('pk_test_51JiRmVHfZ9TYWPiIROi8sdI3Gi0EdHkZ0ZGS0CpKzhFkgRX2mEl0jjEvCPrTfJr9cdNUQnMSOelTOVdEoUcLerVb00BY1aOAGs')
  ],
  entryComponents:[ModalComponent],
  providers: [interceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
