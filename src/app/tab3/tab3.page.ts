import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonList,
  IonItem,
  IonText, IonCard, IonCardHeader, IonAvatar, IonImg, IonLabel, IonCardTitle, IonCardSubtitle
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../components/explore-container/explore-container.component';
import {CustomHeaderComponent} from "../components/custom-header/custom-header/custom-header.component";
import {TranslocoModule} from "@ngneat/transloco";
import {ApiService} from "../services/api/api.service";
import {Product} from "../models/Product";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {HomeSwiperComponent} from "../components/home-swiper/home-swiper.component";
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, HomeSwiperComponent, IonCard, IonCardHeader, RouterLink, IonAvatar, IonImg, IonLabel, IonCardTitle, IonCardSubtitle, IonList, IonItem, IonText, CommonModule, IonButtons, TranslocoModule, CustomHeaderComponent, IonToolbar, IonTitle, IonContent],
})
export class Tab3Page implements OnInit{
  private apiService: ApiService = inject(ApiService);
  lists: Array<Array<Product>> = [];
  electronicList: Array<Product> = [];
  jeweleryList: Array<Product> = [];
  menClothingList: Array<Product> = [];
  womenClothingList: Array<Product> = [];
  categories: Array<string> = ['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing']
  constructor() {}

  ngOnInit() {
    this.categories.forEach((item: string, index: number) => {
      this.apiService.getProductsByCategory(item).subscribe((data: Array<Product>) => {
        this.lists[index] = data;
      })
    })
    this.electronicList = this.lists[0];
    this.jeweleryList = this.lists[1];
    this.menClothingList = this.lists[2];
    this.womenClothingList = this.lists[3];
  }
}
