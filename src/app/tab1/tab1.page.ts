import {Component, inject, OnInit} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonItemSliding,
  IonAlert,
  LoadingController,
  IonMenu,
  IonButtons, IonMenuButton, IonItem, IonItemDivider, IonItemOptions, IonItemOption, IonList, IonIcon, IonBadge
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../components/explore-container/explore-container.component';
import {trash, cartOutline} from "ionicons/icons";
import {addIcons} from "ionicons";
import {SharpService} from "../services/sharp/sharp.service";
import {Product} from "../models/Product";
import {CommonModule, CurrencyPipe} from "@angular/common";
import {ProductCardComponent} from "../components/product-card/product-card.component";
import {RouterLink} from "@angular/router";
import {CustomHeaderComponent} from "../components/custom-header/custom-header/custom-header.component";
import {Order} from "../models/Order";
import {AuthService} from "../services/auth/auth.service";
import {FirebaseService} from "../services/firebase-service/firebase.service";
import {User} from "../models/User";
import {TranslocoModule} from "@ngneat/transloco";
import {IonicModule} from "@ionic/angular";
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, TranslocoModule, IonBadge, IonIcon, IonList, IonItemSliding, IonItemOptions, IonItemOption, IonItemDivider, IonItem, CommonModule, IonMenu, IonButtons, IonMenuButton, TranslocoModule, IonAlert, CustomHeaderComponent, CurrencyPipe, IonItemSliding, RouterLink, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonText, CommonModule, ProductCardComponent],
})
export class Tab1Page implements OnInit{
  sharpList: Array<Product> = [];
  precioTotal: number = 0;
  showOrderAlert: boolean = false;
  private authService: AuthService = inject(AuthService);
  private firestoreService: FirebaseService = inject(FirebaseService);
  private sharpService: SharpService = inject(SharpService);
  private user: User | null = null;
  sharpListSize: number = 0;
  constructor(private loadingController: LoadingController) {
    addIcons({trash, cartOutline})
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
  }

  removeProduct(product: Product): void {
    this.sharpService.removeProduct(product);
  }

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

  private async presentLoading(){
    const loading = await this.loadingController.create({
      message: "Loading...",
      spinner: 'crescent',
      translucent: true,
      backdropDismiss: false,
    })
    await loading.present();
    return loading;
  }
}
