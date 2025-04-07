import {Component, inject, OnInit} from '@angular/core';
import {
  IonBackButton,
  IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent,
  IonHeader, IonItem, IonLabel, IonList,
  IonText, IonThumbnail,
  IonTitle,
  IonToolbar, LoadingController
} from "@ionic/angular/standalone";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {Order} from "../../models/Order";
import {CommonModule, CurrencyPipe} from "@angular/common";
import {TranslocoModule, TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  imports: [IonHeader, TranslocoModule, IonCard, CurrencyPipe, CommonModule, IonCardHeader, IonList, IonLabel, IonItem, IonThumbnail, IonCardTitle, IonCardSubtitle, IonCardContent, IonText, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent]
})
export class OrderDetailsComponent  implements OnInit {
  private authService: AuthService = inject(AuthService);
  private translocoService: TranslocoService = inject(TranslocoService);
  index: number = 0;
  order?: Order;
  constructor(private route: ActivatedRoute, private loadingController: LoadingController) { }

  async ngOnInit() {
    const loading = await this.presentLoading();
    this.route.paramMap.subscribe(params => {
      const indexParam = params.get('index');
      if(indexParam) {
        this.index = parseInt(indexParam, 10);
      }
      this.authService.userData.subscribe((userData) => {
          this.order = userData?.orderList[this.index];
      })
      loading.dismiss();
    });
  }

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
