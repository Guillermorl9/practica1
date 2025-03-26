import {inject, Injectable, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Product} from "../../models/Product";

@Injectable({
  providedIn: 'root'
})
export class OrdersService implements OnInit{
  private authService: AuthService = inject(AuthService);
  private ordersList: Array<Product> | undefined = [];
  constructor() {
  }

  ngOnInit(): void {
    this.authService.userData.subscribe(userData => {
      this.ordersList = userData?.orderList;
      console.log(this.ordersList?.length);
    });
  }
}
