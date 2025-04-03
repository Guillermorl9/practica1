import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Product} from "../../models/Product";
import {AuthService} from "../auth/auth.service";
import {User  as AppUser} from "../../models/User";
@Injectable({
  providedIn: 'root'
})
export class FavoritesService{
  private authService: AuthService = inject(AuthService);
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
  }

  removeProduct(product: Product): void{
    const currentFavorities: Array<Product> = this.favoriteList.getValue();
    const index: number = currentFavorities.indexOf(product);
    if(index > -1){
      currentFavorities.splice(index, 1);
      this.favoriteList.next([...currentFavorities]);
    }
  }

}
