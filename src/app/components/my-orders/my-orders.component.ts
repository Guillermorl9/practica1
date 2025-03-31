import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {CustomHeaderComponent} from "../custom-header/custom-header/custom-header.component";
import {
  IonBackButton,
  IonButton, IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, LoadingController
} from "@ionic/angular/standalone";
import {Order} from "../../models/Order";
import {CommonModule, CurrencyPipe, DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {TranslocoModule} from "@ngneat/transloco";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  imports: [CustomHeaderComponent, TranslocoModule, RouterLink, IonList, IonItem, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, RouterLink, CurrencyPipe, DatePipe, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonContent, CommonModule]
})
export class MyOrdersComponent  implements OnInit {
  ordersList: Array<Order>= [];
  private authService: AuthService = inject(AuthService);
  private loadingController: LoadingController = inject(LoadingController);
  constructor() { }

  async ngOnInit() {
    const loading = await this.presentLoading();
    this.authService.userData.subscribe(userData => {
      this.ordersList = userData?.orderList || [];
      loading.dismiss();
    });
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
