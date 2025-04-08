import {Component, inject, OnInit} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
  IonNav,
  IonNavLink,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonAvatar, IonImg, IonLabel, IonIcon, IonSearchbar, LoadingController,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../components/explore-container/explore-container.component';
import {ProductDetailsComponent} from "../components/product-details/product-details.component";
import {CommonModule, CurrencyPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Product} from "../models/Product";
import {ApiService} from "../services/api/api.service";
import {addIcons} from "ionicons";
import {cartSharp} from "ionicons/icons";
import {ProductCardComponent} from "../components/product-card/product-card.component";
import {TranslocoModule, TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonContent, TranslocoModule, ProductCardComponent, IonToolbar, IonSearchbar, IonTitle, IonAvatar, IonImg, IonLabel, IonIcon, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonContent, ExploreContainerComponent, IonGrid, IonCol, IonRow, IonButton, IonNav, IonNavLink, ProductDetailsComponent, CommonModule, RouterLink, CurrencyPipe]
})
export class Tab2Page implements OnInit{
  private apiService: ApiService = inject(ApiService);
  private translocoService: TranslocoService = inject(TranslocoService);
  component = ProductDetailsComponent;
  productList: Array<Product> = [];
  results: Array<Product> = [];

  constructor(private loadingController: LoadingController) {
    addIcons({cartSharp});
  }

  async ngOnInit() {
    const loading = await this.presentLoading();
    this.apiService.getAllProducts().subscribe((data: Array<Product>) => {
      this.productList = data;
      this.results = [...data];
      loading.dismiss();
    })
  }
  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLocaleLowerCase() || '';
    this.results = this.productList.filter((d) => d.nombre.toLocaleLowerCase().includes(query));
  }

  private async presentLoading(){
    const loading = await this.loadingController.create({
      message: this.translocoService.translate("Loading..."),
      spinner: 'crescent',
      translucent: true,
      backdropDismiss: false,
    })
    await loading.present();
    return loading;
  }

}
