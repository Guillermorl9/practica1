import {Component, OnInit} from '@angular/core';
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
  IonAvatar, IonImg, IonLabel, IonIcon, IonSearchbar,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../components/explore-container/explore-container.component';
import {ProductDetailsComponent} from "../components/product-details/product-details.component";
import {CommonModule, CurrencyPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Product} from "../models/Product";
import {ApiService} from "../services/api/api.service";
import {addIcons} from "ionicons";
import {cartSharp} from "ionicons/icons";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonSearchbar, IonTitle, IonAvatar, IonImg, IonLabel, IonIcon, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonContent, ExploreContainerComponent, IonGrid, IonCol, IonRow, IonButton, IonNav, IonNavLink, ProductDetailsComponent, CommonModule, RouterLink, CurrencyPipe]
})
export class Tab2Page implements OnInit{
  component = ProductDetailsComponent;
  productList: Array<Product> = [];
  results: Array<Product> = [];

  constructor(private apiService: ApiService) {
    addIcons({cartSharp});
  }

  ngOnInit() {
    this.apiService.getAllProducts().subscribe((data: Array<Product>) => {
      this.productList = data;
      this.results = [...data];
    })
  }

 handleInput(event: Event) {

 }

}
