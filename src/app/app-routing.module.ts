import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProdGuardService as guard } from './guards/prod-guard.service';
import { AdminListComponent } from './pages/admin-list/admin-list.component';
import { EquipoComponent } from './pages/equipo/equipo.component';
import { HomeComponent } from './pages/home/home.component';
import { NewProductoComponent } from './pages/new-producto/new-producto.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { ConfirmacionComponent } from './pages/confirmacion/confirmacion.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { UpdateProductoComponent } from './pages/update-producto/update-producto.component';
import { PaymentComponent } from './pages/payment/payment.component';



const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"lista",component:ProductosComponent},
  {path:"admin-list",component:AdminListComponent,canActivate:[guard],data:{expectedRol:['admin']}},
  {path:"detalle/:id",component:ProductoComponent},
  {path:"nuevo",component:NewProductoComponent,canActivate:[guard],data:{expectedRol:['admin']}},
  {path:"update/:id",component:UpdateProductoComponent,canActivate:[guard],data:{expectedRol:['admin']}},
  {path:"equipo",component:EquipoComponent},
  {path:"payment",component:PaymentComponent,canActivate:[guard],data:{expectedRol:['admin','user']}},
  {path:"contactanos",component:ContactanosComponent},
  {path:"confirmacion",component:ConfirmacionComponent,canActivate:[guard],data:{expectedRol:['admin','user']}},
  {path:"nosotros",component:NosotrosComponent},
  {path:"**",redirectTo:"",pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
