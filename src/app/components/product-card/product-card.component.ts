import {Component, inject, Input} from '@angular/core';
import {Product} from "../../models/Product";
import {
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle, IonCol, IonGrid, IonIcon,
  IonImg,
  IonItem, IonItemOption, IonItemOptions, IonItemSliding,
  IonLabel, IonRow
} from "@ionic/angular/standalone";
import {RouterLink} from "@angular/router";
import {CommonModule, CurrencyPipe} from "@angular/common";
import {addIcons} from "ionicons";
import {trash} from "ionicons/icons";
import {SharpService} from "../../services/sharp/sharp.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  imports: [IonCard, IonGrid, IonCol, IonRow, IonIcon, IonItemOptions, IonItemOption, IonItemSliding, IonCardHeader, IonItem, RouterLink, IonAvatar, IonImg, IonLabel, IonCardTitle, IonCardSubtitle, CurrencyPipe, CommonModule]
})
export class ProductCardComponent{
   @Input() products: Array<Product> = [];
   @Input() isCart: boolean = false;
   private sharpService: SharpService = inject(SharpService);
  constructor() {
    addIcons({trash})
  }

  deleteProduct(product: Product): void{
    this.sharpService.removeProduct(product);
  }

}
