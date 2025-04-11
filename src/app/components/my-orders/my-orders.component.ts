import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Order} from "../../models/Order";
import {CommonModule, CurrencyPipe, DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {TranslocoModule, TranslocoService} from "@ngneat/transloco";
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

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  imports: [TranslocoModule, RouterLink, IonList, IonItem, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, RouterLink, CurrencyPipe, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonContent, CommonModule]
})
export class MyOrdersComponent  implements OnInit {
  // Services
  private authService: AuthService = inject(AuthService);
  private transLocoService: TranslocoService = inject(TranslocoService);
  private loadingController: LoadingController = inject(LoadingController);

  // Variables
  ordersList: Array<Order>= [];

  constructor() { }

  async ngOnInit() {
    const loading = await this.presentLoading();
    this.authService.userData.subscribe(userData => {
      this.ordersList = userData?.orderList || [];
      loading.dismiss();
    });
  }

  // Loading spinner
  private async presentLoading(){
    const loading = await this.loadingController.create({
      message: this.transLocoService.translate( "Loading..."),
      spinner: 'crescent',
      translucent: true,
      backdropDismiss: false,
    })
    await loading.present();
    return loading;
  }

}
