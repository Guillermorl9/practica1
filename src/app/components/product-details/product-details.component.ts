import {Component, inject, OnInit} from '@angular/core';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonIcon, IonImg, IonItem, IonSkeletonText, IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/angular/standalone";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../models/Product";
import {ApiService} from "../../services/api/api.service";
import {CurrencyPipe} from "@angular/common";
import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/angular/standalone";
import {starOutline, starHalf, star, add, remove, heart, heartOutline} from 'ionicons/icons';
import {addIcons} from "ionicons";
import {CommonModule} from "@angular/common";
import {SharpService} from "../../services/sharp/sharp.service";
import {FavoritesService} from "../../services/favorites/favorites.service";
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  imports: [IonHeader, IonSkeletonText, CommonModule, IonToolbar, IonButtons, IonItem, IonIcon, IonBackButton, IonTitle, IonContent, IonButton, IonText, CurrencyPipe, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg, LottieComponent]
})
export class ProductDetailsComponent implements OnInit{
  // Services
  private apiService: ApiService = inject(ApiService);
  private sharpService: SharpService = inject(SharpService);
  private favoritesService: FavoritesService = inject(FavoritesService);

  // Constants
  readonly LOTTIE_OPTIONS: AnimationOptions = {
    path: 'assets/button-animation3.json',
    autoplay: true,
    loop: false
  };

  // Variables
  loaded: boolean = false;
  productoId?: string | null;
  producto?: Product;
  iconos: Array<String> = [];
  cantidad: number = 1;
  buttonAddDisabled: boolean = this.cantidad == 10;
  buttonRemoveDisabled: boolean = this.cantidad == 1;
  showLottie: boolean = false;
  private animationItem: AnimationItem | null = null;

  constructor(private route: ActivatedRoute) {
    addIcons({ starOutline, starHalf, star, add, remove, heart, heartOutline});
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productoId = params.get('productoId');
      // @ts-ignore
      this.apiService.getProduct(this.productoId).subscribe((data: Product) => {
        this.producto = data;
        if(this.favoritesService.exists(this.producto)){
          this.producto.favorito = true;
        }
        this.iconos =  this.calcularIcono();
        this.loaded = true;
      })
    });
  }

  // Add the product to the favorites list
  public addFavoriteProduct(product: Product): void{
    if(!this.producto){
      return;
    }
    this.producto.favorito = true;
    this.favoritesService.addProduct(product);
  }

  // Remove the product from the favorites list
  public removeFavoriteProduct(product: Product): void{
    if(!this.producto){
      return;
    }
    this.producto.favorito = false;
    this.favoritesService.removeProduct(product);
  }

  // Set the icons to be displayed
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

  // Get the icon based on the rating
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

  // Increase the quantity of the product
  public incrementarCantidad(){
    if(this.cantidad < 10){
      this.cantidad++;
      this.buttonAddDisabled = this.cantidad == 10;
      this.buttonRemoveDisabled = this.cantidad == 1;
    }
  }

  // Decrease the quantity of the product
  public decrementarCantidad(){
    if(this.cantidad > 1){
      this.cantidad--;
      this.buttonAddDisabled = this.cantidad == 10;
      this.buttonRemoveDisabled = this.cantidad == 1;
    }
  }

  // Add the product to the cart
  public addProductToCart(){
    if(this.producto) {
      this.sharpService.addProduct(this.producto, this.cantidad);
      this.showLottie = true;
      this.playAnimation();
      setTimeout(() => {
        this.showLottie = false;
      }, 3000);
    }
  }

  // Lottie animation methods
  handleAnimation(anim: any) {
    this.animationItem = anim;
  }
  playAnimation() {
    if(this.animationItem) {
      this.animationItem?.goToAndPlay(0, true);
    }
  }

}
