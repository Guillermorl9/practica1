import { Injectable } from '@angular/core';
import {Product} from "../../models/Product";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharpService {
  private sharpList = new BehaviorSubject<Array<Product>>([]);
  public currentSharp = this.sharpList.asObservable();
  constructor() { }

  añadirProducto(product: Product, cantidad: number): void{
    for(let i= 1; i < cantidad; i++){
      this.sharpList.value.push(product);
    }
    const currentSharp = this.sharpList.getValue();
    this.sharpList.next([...currentSharp, product]);
  }

  removeProduct(product: Product): void{
    const currentSharp = this.sharpList.getValue();
    const index = currentSharp.indexOf(product);
    if(index > - 1){
      currentSharp.splice(index, 1);
      this.sharpList.next([...currentSharp]);
    }
  }

  getPrecioTotal(): number{
    let precioTotal = 0;
    this.sharpList.value.forEach((product) => {
      precioTotal += product.precio;
    });
    return precioTotal;
  }
}
