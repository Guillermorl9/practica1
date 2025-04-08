import {Component, inject, OnInit} from '@angular/core';
import { LoadingController } from '@ionic/angular/standalone';
import {ProductDetailsComponent} from "../components/product-details/product-details.component";
import {CommonModule, CurrencyPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Product} from "../models/Product";
import {ApiService} from "../services/api/api.service";
import {addIcons} from "ionicons";
import {cartSharp} from "ionicons/icons";
import {TranslocoModule, TranslocoService} from "@ngneat/transloco";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [TranslocoModule, ProductDetailsComponent, CommonModule, RouterLink, CurrencyPipe, IonicModule]
})
export class Tab2Page implements OnInit{
  // Services
  private apiService: ApiService = inject(ApiService);
  private translocoService: TranslocoService = inject(TranslocoService);

  // Variables
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

  // Function to handle the search input
  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLocaleLowerCase() || '';
    this.results = this.productList.filter((d) => d.nombre.toLocaleLowerCase().includes(query));
  }

  // Function to handle the clear input
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
