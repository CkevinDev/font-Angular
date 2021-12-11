import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  //productoUrl = 'http://localhost:8080/producto/'
  productoUrl = 'https://plastic-antonys.herokuapp.com/producto/'

  constructor(private httpClient:HttpClient) { }

  public lista():Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(this.productoUrl+'lista')
  }

  public detail(id:number):Observable<Producto>{
    return this.httpClient.get<Producto>(this.productoUrl+`detail/${id}`)
  }

  public detailName(nombre:string):Observable<Producto>{
    return this.httpClient.get<Producto>(this.productoUrl+`detailname/${nombre}`)
  }

  public create(producto:Producto):Observable<any>{
    return this.httpClient.post<any>(this.productoUrl+`create`,producto)
  }

  public update(id:number,producto:Producto):Observable<Producto>{
    return this.httpClient.put<Producto>(this.productoUrl+`update/${id}`,producto)
  }

  public delete(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.productoUrl+`delete/${id}`)
  }
}
