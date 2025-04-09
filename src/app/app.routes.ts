import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {authGuardGuard} from "./guards/auth-guard/auth-guard.guard";
import {RecoverPasswordComponent} from "./components/recover-password/recover-password.component";
export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'tabs',
    canActivate: [authGuardGuard],
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'recover-password',
    component: RecoverPasswordComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
