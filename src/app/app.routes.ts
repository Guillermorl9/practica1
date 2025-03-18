import {RouterModule, Routes} from '@angular/router';
import {ProductDetailsComponent} from "./components/product-details/product-details.component";
import {NgModule} from "@angular/core";

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'tab2/:productoId',
    component: ProductDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
