import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLogged = false;

  isRegister = false;
  isRegisterFail = false;
  nuevoUsuario!:NuevoUsuario;
  nombre!:string ;
  username!:string;
  email!:string;
  password!:string;
  errSMS:string="";

  constructor(
    private tokenService:TokenService,
    private authService:AuthService,
    private router:Router,
    private toaster:ToastrService,
  ) { }

  ngOnInit(): void {
    this.isLogged = false;
    if(this.tokenService.getToken()){
      this.isLogged=true;
    }
  }


  onRegister():void{
      this.nuevoUsuario = new NuevoUsuario(this.nombre,this.username,this.email,this.password);
      this.authService.nuevo(this.nuevoUsuario).subscribe(
        data=>{
          this.isLogged = true;
          this.isRegisterFail = false;
  
          this.tokenService.setToken(data.token);
          this.tokenService.setUsername(data.username);
          this.tokenService.setAuthorities(data.authorities);
          this.router.navigate(['/']).then(()=>window.location.reload());
        },
        err=>{
          this.isLogged=false;
          this.isRegisterFail=true;
          if(!err.error.message){
            this.toaster.error(err.error.mensaje,'Fail',{
              timeOut:3000
            })
          }else{
            this.toaster.error(err.error.message,'Fail',{
              timeOut:3000
            })
          }        
        }
      )
    }
}


