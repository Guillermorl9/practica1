import {
  Component, CUSTOM_ELEMENTS_SCHEMA,
  inject,
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
  IonSkeletonText
} from '@ionic/angular/standalone';
import {TranslocoModule} from "@ngneat/transloco";
import { ApiService } from "../services/api/api.service";
import { Product } from "../models/Product";
import { CommonModule, TitleCasePipe } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonHeader, IonSkeletonText, TitleCasePipe, IonCard, IonCardHeader, IonCardSubtitle, IonText, CommonModule, TranslocoModule, IonToolbar, IonTitle, IonContent, RouterLink, IonCardTitle],
})
export class Tab3Page implements OnInit {
  // Services
  private apiService: ApiService = inject(ApiService);
  // Constants
  readonly CATEGORIES: Array<string> = [
    'electronics',
    'jewelery',
    'men\'s clothing',
    'women\'s clothing'];
  readonly BREAKPOINTS = {
    0: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    990: { slidesPerView: 3 },
    1200: { slidesPerView: 4 },
  };
  // Variables
  loaded: boolean = false;
  lists: Array<Array<Product>> = [];

  constructor() {}

  async ngOnInit() {
    this.CATEGORIES.forEach((item: string, index: number) => {
      this.apiService.getProductsByCategory(item).subscribe((data: Array<Product>) => {
        this.lists[index] = data;
        this.loaded = true;
      });
    });
  }
}
