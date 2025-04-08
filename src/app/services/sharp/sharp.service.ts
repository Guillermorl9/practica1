import {inject, Injectable} from '@angular/core';
import {Product} from "../../models/Product";
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {FirebaseService} from "../firebase-service/firebase.service";

@Injectable({
  providedIn: 'root'
})
export class SharpService{
  // Services
  private authService: AuthService = inject(AuthService);
  private firestoreService: FirebaseService = inject(FirebaseService);
  // Variables
  private sharpList = new BehaviorSubject<Array<Product>>([]);
  public currentSharp = this.sharpList.asObservable();

  constructor() {
    this.authService.userData.subscribe((userData) => {
      if(userData?.cartList){
        this.sharpList.next(userData.cartList);
      }
    })
  }

  // Add a product to the cart
  addProduct(product: Product, cantidad: number): void{
    const uid = this.authService.getUid();
    for(let i= 1; i < cantidad; i++){
      this.sharpList.value.push(product);
    }
    const currentSharp = this.sharpList.getValue();
    this.sharpList.next([...currentSharp, product]);
    this.firestoreService.updateCartList(uid, this.sharpList.value);

  }

  // Remove a product from the cart
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

  // Get the total price of the cart
  getPrecioTotal(): number{
    let precioTotal = 0;
    this.sharpList.value.forEach((product) => {
      precioTotal += product.precio;
    });
    return precioTotal;
  }

  // Empty the cart
  emptyCart(){
    this.sharpList.next([]);
  }
}
