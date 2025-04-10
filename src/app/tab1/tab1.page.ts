import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit} from '@angular/core';
import {
  IonAlert,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonList,
  IonMenu,
  IonMenuButton,
  IonText,
  IonTitle,
  IonToolbar,
  LoadingController
} from '@ionic/angular/standalone';
import {cartOutline, trash, heart} from "ionicons/icons";
import {addIcons} from "ionicons";
import {SharpService} from "../services/sharp/sharp.service";
import {Product} from "../models/Product";
import {CommonModule, CurrencyPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Order} from "../models/Order";
import {AuthService} from "../services/auth/auth.service";
import {FirebaseService} from "../services/firebase-service/firebase.service";
import {User} from "../models/User";
import {TranslocoModule, TranslocoService} from "@ngneat/transloco";
import {FavoritesService} from "../services/favorites/favorites.service";
import {ApiService} from "../services/api/api.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonHeader, CommonModule, TranslocoModule, IonBadge, IonIcon, IonList, IonItemSliding, IonItemOptions, IonItemOption, IonItemDivider, IonItem, CommonModule, IonMenu, IonButtons, IonMenuButton, TranslocoModule, IonAlert, CurrencyPipe, IonItemSliding, RouterLink, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonToolbar, IonTitle, IonContent, IonText, CommonModule],
})
export class Tab1Page implements OnInit{
  // Services
  private authService: AuthService = inject(AuthService);
  private firestoreService: FirebaseService = inject(FirebaseService);
  private sharpService: SharpService = inject(SharpService);
  private favoritesService: FavoritesService = inject(FavoritesService);
  private apiService: ApiService = inject(ApiService);
  private translocoService: TranslocoService = inject(TranslocoService);
  // Constants
  readonly categories: Array<string> = [
    'electronics',
    'jewelery',
    'men\'s clothing',
    'women\'s clothing'];

  readonly IMAGES: Array<String> = [
    'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
    'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
    'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
  ]
  // Variables
  sharpList: Array<Product> = [];
  favoritesList: Array<Product> = [];
  featuredProducts: Array<Product> = [];
  precioTotal: number = 0;
  showOrderAlert: boolean = false;
  private user: User | null = null;
  sharpListSize: number = 0;
  favoritesListSize: number = 0;
  breakpoints = {
    0: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    990: { slidesPerView: 3 },
    1200: { slidesPerView: 4 },
  };
  category: string = this.categories[Math.floor(Math.random() * this.categories.length)];

  constructor(private loadingController: LoadingController) {
    addIcons({trash, cartOutline, heart})
  }
  async ngOnInit() {
    const loading = await this.presentLoading();
    this.sharpService.currentSharp.subscribe((data) => {
      this.sharpList = data;
      this.precioTotal = this.sharpService.getPrecioTotal();
      this.sharpListSize = data.length;
      loading.dismiss();
    })
    this.authService.userData.subscribe((userData) => {
      this.user = userData;
      loading.dismiss();
    })
    this.favoritesService.currentFavorites.subscribe((data: Array<Product>) => {
      this.favoritesList = data;
      this.favoritesListSize = this.favoritesList.length;
    })
    this.apiService.getProductsByCategory(this.category).subscribe((data: Array<Product>) => {
      this.featuredProducts = data;
    })
  }

  // Remove product from cart
  removeProduct(product: Product): void {
    this.sharpService.removeProduct(product);
  }

  // Place order from cart
  async placeOrder(): Promise<void> {
    if(!this.user){
      return;
    }
    const userOrdersList = this.user.orderList;
    const order: Order = {
      products: [...this.sharpList],
      precio: this.precioTotal,
      fecha: new Date().toLocaleString('es-Es')
    }
    const uid: string = this.authService.getUid();
      userOrdersList.push(order);
      await this.firestoreService.updateOrdersList(uid, userOrdersList).then(() => {
        this.user!.orderList = userOrdersList;
        this.sharpService.emptyCart();
        this.firestoreService.emptyCartList(uid);
        this.precioTotal = 0;
      });
      this.showOrderAlert = true;
  }

  // Remove product from favorites
  removeFavoriteProduct(product: Product): void {
    this.favoritesService.removeProduct(product);
  }

  // Loading spinner
  private async presentLoading(){
    const loading = await this.loadingController.create({
      message: this.translocoService.translate( "Loading..."),
      spinner: 'crescent',
      translucent: true,
      backdropDismiss: false,
    })
    await loading.present();
    return loading;
  }
}
