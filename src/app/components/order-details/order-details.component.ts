import {Component, inject, OnInit} from '@angular/core';
import {
  IonBackButton,
  IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent,
  IonHeader, IonItem, IonLabel, IonList,
  IonText, IonThumbnail,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {Order} from "../../models/Order";
import {CommonModule, CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  imports: [IonHeader, IonCard, CurrencyPipe, CommonModule, IonCardHeader, IonList, IonLabel, IonItem, IonThumbnail, IonCardTitle, IonCardSubtitle, IonCardContent, IonText, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent]
})
export class OrderDetailsComponent  implements OnInit {
  private authService: AuthService = inject(AuthService);
  index: number = 0;
  order?: Order;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const indexParam = params.get('index');
      if(indexParam) {
        this.index = parseInt(indexParam, 10);
      }
      this.authService.userData.subscribe((userData) => {
          this.order = userData?.orderList[this.index];
      })
    });
  }

}
