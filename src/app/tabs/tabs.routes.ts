import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { ConfigComponent } from "../components/config/config.component";
import {ProductDetailsComponent} from "../components/product-details/product-details.component";
import {MyOrdersComponent} from "../components/my-orders/my-orders.component";

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab2/:productoId',
        component: ProductDetailsComponent
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: 'tab4',
        component: ConfigComponent,
      },
      {
        path: 'tab4/my-orders',
        component: MyOrdersComponent
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ]
  }
];
