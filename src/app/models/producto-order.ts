import { Producto } from "./producto";

export class ProductoOrder {
    producto!:Producto;
    quantity!:number;


    constructor(producto:Producto,quantity:number){
        this.producto=producto;
        this.quantity=quantity;
    }
}
