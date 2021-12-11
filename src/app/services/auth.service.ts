import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../models/jwt-dto';
import { LoginUsuario } from '../models/login-usuario';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //authUrl = 'http://localhost:8080/auth/'
  authUrl = 'https://plastic-antonys.herokuapp.com/auth/'

  constructor(private httpClient:HttpClient) { }


  public nuevo(nuevoUsuario:NuevoUsuario):Observable<any>{
    return this.httpClient.post<any>(this.authUrl+`nuevo`,nuevoUsuario);
  }

  public login(loginUsuario:LoginUsuario):Observable<JwtDto>{
    return this.httpClient.post<JwtDto>(this.authUrl+`login`,loginUsuario);
  }

  public getUserByUsername(username:string):Observable<Usuario>{
    return this.httpClient.get<Usuario>(this.authUrl+`getuser/${username}`);
  }
}
