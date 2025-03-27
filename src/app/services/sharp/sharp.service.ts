import {inject, Injectable} from '@angular/core';
import {Product} from "../../models/Product";
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {FirebaseService} from "../firebase-service/firebase.service";

@Injectable({
  providedIn: 'root'
})
export class SharpService{
  private sharpList = new BehaviorSubject<Array<Product>>([]);
  public currentSharp = this.sharpList.asObservable();
  private authService: AuthService = inject(AuthService);
  private firestoreService: FirebaseService = inject(FirebaseService);
  constructor() {
    this.authService.userData.subscribe((userData) => {
      if(userData?.cartList){
        this.sharpList.next(userData.cartList);
        console.log("UserData: " + userData.cartList.length);
        console.log("SharpList: " + this.sharpList.value.length);
      }
    })
  }

  addProduct(product: Product, cantidad: number): void{
    const uid = this.authService.getUid();
    for(let i= 1; i < cantidad; i++){
      this.sharpList.value.push(product);
    }
    const currentSharp = this.sharpList.getValue();
    this.sharpList.next([...currentSharp, product]);
    this.firestoreService.updateCartList(uid, this.sharpList.value);

  }

  removeProduct(product: Product): void{
    const uid = this.authService.getUid();
    const currentSharp = this.sharpList.getValue();
    const index = currentSharp.indexOf(product);
    if(index > - 1){
      currentSharp.splice(index, 1);
      this.sharpList.next([...currentSharp]);
      this.firestoreService.updateCartList(uid, this.sharpList.value);
    }
  }

  getPrecioTotal(): number{
    let precioTotal = 0;
    this.sharpList.value.forEach((product) => {
      precioTotal += product.precio;
    });
    return precioTotal;
  }

  emptyCart(){
    this.sharpList.next([]);
  }
}
