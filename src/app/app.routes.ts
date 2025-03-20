import {RouterModule, Routes} from '@angular/router';
import {ProductDetailsComponent} from "./components/product-details/product-details.component";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./components/login/login.component";

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'tabs/tab2/:productoId',
    component: ProductDetailsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
