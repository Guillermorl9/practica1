import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/Product";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home-swiper',
  templateUrl: './home-swiper.component.html',
  styleUrls: ['./home-swiper.component.scss'],
  imports: [IonicModule, CommonModule, RouterLink]
})
export class HomeSwiperComponent  implements OnInit {
  @Input() productList: Array<Product> = [];
  productIndex: number = 0;
  constructor() { }

  ngOnInit() {}

  cambiar(): void {
    if(this.productIndex == (this.productList.length - 1)){
      this.productIndex = 0;
    }else{
      this.productIndex++;
    }
  }

}
