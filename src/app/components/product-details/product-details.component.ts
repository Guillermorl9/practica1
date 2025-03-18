import { Component, OnInit } from '@angular/core';
import {
  IonBackButton,
  IonButton,
  IonButtons, IonCol,
  IonContent,
  IonHeader, IonIcon, IonItem, IonRow, IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/angular/standalone";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../models/Product";
import {ApiService} from "../../services/api/api.service";
import {CurrencyPipe} from "@angular/common";
import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/angular/standalone";
import {starOutline, starHalf, star} from 'ionicons/icons';
import {addIcons} from "ionicons";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  imports: [IonHeader, CommonModule, IonToolbar, IonButtons, IonItem, IonIcon, IonBackButton, IonTitle, IonContent, IonButton, IonText, CurrencyPipe, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle]
})
export class ProductDetailsComponent implements OnInit{
  productoId?: string | null;
  producto?: Product;
  iconos: Array<String> = [];
  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    addIcons({ starOutline, starHalf, star});
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productoId = params.get('productoId');
      // @ts-ignore
      this.apiService.getProduct(this.productoId).subscribe((data: Product) => {
        this.producto = data;
        this.iconos =  this.calcularIcono();
      })
    });
  }

  private calcularIcono(): Array<String>{
    let iconos: Array<String> = [];
    let valoracion: number | undefined = this.producto?.valoracion;
    if(valoracion == undefined){
      return iconos;
    }
    for(let i = 0; i < 5 ; i++){
      let icono: String = this.getIcono(valoracion);
      iconos.push(icono);
      valoracion--;
    }
    return iconos;
  }

  private getIcono(valoracion: number): String {
    let icono: String;
    if(valoracion > 0 && valoracion < 1){
      icono = 'star-half';
    }else if(valoracion >= 1){
      icono = 'star';
    }else if (valoracion <= 0){
      icono = 'star-outline';
    }else{
      icono = 'star-outline';
    }
    return icono;
  }

}
