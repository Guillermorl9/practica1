import {Component, inject, OnInit} from '@angular/core';
import { LoadingController } from "@ionic/angular/standalone";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {Order} from "../../models/Order";
import {CommonModule, CurrencyPipe} from "@angular/common";
import {TranslocoModule, TranslocoService} from "@ngneat/transloco";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  imports: [TranslocoModule, CurrencyPipe, CommonModule, IonicModule]
})
export class OrderDetailsComponent  implements OnInit {
  // Services
  private authService: AuthService = inject(AuthService);
  private translocoService: TranslocoService = inject(TranslocoService);

  // Variables
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
