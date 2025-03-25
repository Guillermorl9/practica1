import { Component, OnInit } from '@angular/core';
import {
  IonAvatar,
  IonButton,
  IonCard, IonCardContent,
  IonCardHeader, IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader, IonIcon, IonItem, IonLabel, IonList,
  IonTitle, IonToggle,
  IonToolbar
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {personOutline} from "ionicons/icons";
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/User";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {CustomHeaderComponent} from "../custom-header/custom-header/custom-header.component";
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  imports: [IonHeader, CustomHeaderComponent, IonIcon, RouterLink, IonList, IonItem, IonLabel, IonToggle, IonToolbar, IonTitle, IonContent, IonCard, IonAvatar, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton],
})
export class ConfigComponent  implements OnInit {
  user: User | null = null;
  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    addIcons({personOutline});
  }

  ngOnInit() {
    this.authService.userData.subscribe(userData => {
      this.user = userData;
      console.log('Datos del usuario en Config:', this.user);
    });
  }

  logOut(): void{
    this.authService.logout().then((): void => {this.router.navigate(['/login'])});
  }

}
