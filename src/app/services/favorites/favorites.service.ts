import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Product} from "../../models/Product";
import {AuthService} from "../auth/auth.service";
import {User  as AppUser} from "../../models/User";
import {FirebaseService} from "../firebase-service/firebase.service";
@Injectable({
  providedIn: 'root'
})
export class FavoritesService{
  private authService: AuthService = inject(AuthService);
  private firestoreService: FirebaseService = inject(FirebaseService);
  private favoriteList: BehaviorSubject<Array<Product>> = new BehaviorSubject<Array<Product>>([]);
  public currentFavorites: Observable<Array<Product>> = this.favoriteList.asObservable();
  constructor() {
    this.authService.userData.subscribe((userData: AppUser | null) => {
      if(userData?.favoritesList){
        this.favoriteList.next(userData.favoritesList);
      }
    })
  }

  addProduct(product: Product): void{
    const uid: string = this.authService.getUid();
    this.favoriteList.value.push(product);
    const currentFavorites = this.favoriteList.getValue();
    this.favoriteList.next([...currentFavorites]);
    this.firestoreService.updateFavoritesList(uid, this.favoriteList.value);
  }

  removeProduct(product: Product): void {
    const uid: string = this.authService.getUid();
    const currentFavorites: Array<Product> = this.favoriteList.getValue();
    const index: number = currentFavorites.findIndex(item => item.id === product.id);
    if (index > -1) {
      product.favorito = false;
      currentFavorites.splice(index, 1);
      this.favoriteList.next([...currentFavorites]);
      this.firestoreService.updateFavoritesList(uid, this.favoriteList.value);
    }
  }

  exists(product: Product): boolean{
    if(!this.favoriteList.value.find((p => p.id === product.id))){
      return false;
    }else{
      return true;
    }
  }

  getSize(): number {
    return this.favoriteList.value.length;
  }
}
