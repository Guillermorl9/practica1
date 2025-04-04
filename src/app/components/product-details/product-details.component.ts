import {Component, inject, OnInit} from '@angular/core';
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonIcon, IonInput, IonItem, IonSkeletonText, IonText,
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
import {Router} from "@angular/router";
import {LoadingController} from "@ionic/angular/standalone";
import {FavoritesService} from "../../services/favorites/favorites.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  imports: [IonHeader, IonSkeletonText, IonAlert, CommonModule, IonToolbar, IonInput, IonButtons, IonItem, IonIcon, IonBackButton, IonTitle, IonContent, IonButton, IonText, CurrencyPipe, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle]
})
export class ProductDetailsComponent implements OnInit{
  private apiService: ApiService = inject(ApiService);
  private sharpService: SharpService = inject(SharpService);
  private favoritesService: FavoritesService = inject(FavoritesService);
  loaded: boolean = false;
  productoId?: string | null;
  producto?: Product;
  iconos: Array<String> = [];
  cantidad: number = 1;
  buttonAddDisabled: boolean = this.cantidad == 10;
  buttonRemoveDisabled: boolean = this.cantidad == 1;
  constructor(private route: ActivatedRoute, private router: Router, private loadingController: LoadingController) {
    addIcons({ starOutline, starHalf, star, add, remove, heart, heartOutline});
  }

  async ngOnInit() {
    //const loading = await this.presentLoading();
    this.route.paramMap.subscribe(params => {
      this.productoId = params.get('productoId');
      // @ts-ignore
      this.apiService.getProduct(this.productoId).subscribe((data: Product) => {
        this.producto = data;
        console.log(`Producto favorito: ${this.producto.favorito}`);
        this.iconos =  this.calcularIcono();
        this.loaded = true;
        //loading.dismiss();
      })
    });
  }
  public incrementarCantidad(){
    if(this.cantidad < 10){
      this.cantidad++;
      this.buttonAddDisabled = this.cantidad == 10;
      this.buttonRemoveDisabled = this.cantidad == 1;
    }
  }

  public addFavoriteProduct(product: Product): void{
    console.log(`Producto favorito: ${this.producto?.favorito}`);
    if(!this.producto){
      return;
    }
    this.producto.favorito = true;
    this.favoritesService.addProduct(product);
  }

  public removeFavoriteProduct(product: Product): void{
    if(!this.producto){
      return;
    }
    this.producto.favorito = false;
    this.favoritesService.removeProduct(product);
  }

  private async presentLoading(){
    const loading = await this.loadingController.create({
      message: "Loading...",
      spinner: 'crescent',
      translucent: true,
      backdropDismiss: false,
    })
    await loading.present();
    return loading;
  }

  public addProductToCart(){
    if(this.producto) {
      this.sharpService.addProduct(this.producto, this.cantidad);
      this.cantidad = 1;
      this.router.navigate(['/tabs/tab1/']);
    }
  }

  public decrementarCantidad(){
    if(this.cantidad > 1){
      this.cantidad--;
      this.buttonAddDisabled = this.cantidad == 10;
      this.buttonRemoveDisabled = this.cantidad == 1;
    }
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
