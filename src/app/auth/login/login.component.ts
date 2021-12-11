import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //ICONOS
  faSignInAlt = faSignInAlt;

  //VARIABLES
  isLogged = false;
  isLoginFail = false;
  loginUsuario!:LoginUsuario;
  username!:string;
  password!:string;
  roles:string[]=[];
  errSMS:string="";

  constructor(
    private tokenService:TokenService,
    private authService:AuthService,
    private router:Router,
    private toaster:ToastrService,
  ) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged=true;
      this.isLoginFail=false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin():void{
    this.loginUsuario = new LoginUsuario(this.username,this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data=>{
        this.isLogged = true;
        this.isLoginFail = false;

        this.tokenService.setToken(data.token);
        this.tokenService.setUsername(data.username);
        this.tokenService.setAuthorities(data.authorities);
        this.roles=data.authorities;
        this.router.navigate(['/']).then(()=>window.location.reload());
      },
      err=>{
        this.isLogged=false;
        this.isLoginFail=true;
        if(!err.error.message){
          this.toaster.error(err.error.mensaje,'Fail',{
            timeOut:3000
          })
        }else{
          this.toaster.error(err.error.mensaje,'Fail',{
            timeOut:3000
          })
        }        
      }
    )
  }


}
