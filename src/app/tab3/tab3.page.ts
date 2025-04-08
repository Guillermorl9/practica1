import {
  Component, CUSTOM_ELEMENTS_SCHEMA,
  inject, OnDestroy,
  OnInit
} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonList,
  IonItem,
  IonText,
  IonCard,
  IonCardHeader,
  IonAvatar,
  IonImg,
  IonLabel,
  IonCardTitle,
  IonCardSubtitle,
  LoadingController,
  IonSkeletonText
} from '@ionic/angular/standalone';
import {TranslocoModule, TranslocoService} from "@ngneat/transloco";
import { ApiService } from "../services/api/api.service";
import { Product } from "../models/Product";
import { CommonModule, TitleCasePipe } from "@angular/common";
import { RouterLink } from "@angular/router";
import { HomeSwiperComponent } from "../components/home-swiper/home-swiper.component";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonHeader, IonSkeletonText, TitleCasePipe, HomeSwiperComponent, IonCard, IonCardHeader, RouterLink, IonAvatar, IonImg, IonLabel, IonCardTitle, IonCardSubtitle, IonList, IonItem, IonText, CommonModule, IonButtons, TranslocoModule, IonToolbar, IonTitle, IonContent],
})
export class Tab3Page implements OnInit {
  private translocoService: TranslocoService = inject(TranslocoService);
  private apiService: ApiService = inject(ApiService);
  loaded: boolean = false;
  lists: Array<Array<Product>> = [];
  categories: Array<string> = [
    'electronics',
    'jewelery',
    'men\'s clothing',
    'women\'s clothing'];
  breakpoints = {
    0: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    990: { slidesPerView: 3 },
    1200: { slidesPerView: 4 },
  };

  constructor(private loadingController: LoadingController) {}

  async ngOnInit() {
    //const loading = await this.presentLoading();
    this.categories.forEach((item: string, index: number) => {
      this.apiService.getProductsByCategory(item).subscribe((data: Array<Product>) => {
        this.lists[index] = data;
        //loading.dismiss();
        this.loaded = true;
      });
    });
  }

  private async presentLoading() {
    const loading = await this.loadingController.create({
      message: this.translocoService.translate( "Loading..."),
      spinner: 'crescent',
      translucent: true,
      backdropDismiss: false,
    });
    await loading.present();
    return loading;
  }
}
