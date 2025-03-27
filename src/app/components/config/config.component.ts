import {Component, OnInit, ViewChild} from '@angular/core';
import {
  IonAvatar,
  IonButton, IonButtons,
  IonCard, IonCardContent,
  IonCardHeader, IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList,
  IonTitle, IonToggle,
  IonToolbar
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {personOutline, trendingUpOutline, logOutOutline, moonOutline} from "ionicons/icons";
import {User} from "../../models/User";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {CustomHeaderComponent} from "../custom-header/custom-header/custom-header.component";
import {IonModal} from "@ionic/angular/standalone";
import { OverlayEventDetail } from '@ionic/core/components';
import {FormsModule} from "@angular/forms";
import {FirebaseService} from "../../services/firebase-service/firebase.service";
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  imports: [IonHeader, IonToggle, FormsModule, IonButtons, IonModal, IonInput, CustomHeaderComponent, IonIcon, RouterLink, IonList, IonItem, IonLabel, IonToggle, IonToolbar, IonTitle, IonContent, IonCard, IonAvatar, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton],
})
export class ConfigComponent  implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  user: User | null = null;
  firstName: string = this.authService.getFirstName();
  paletteToggle: boolean = false;
  constructor(private authService: AuthService, private router: Router, private firestoreService: FirebaseService) {
    addIcons({personOutline, trendingUpOutline, logOutOutline, moonOutline});
  }

  ngOnInit() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.initiDarkPalette(prefersDark.matches);
    prefersDark.addEventListener('change', (mediaQuery) => this.initiDarkPalette(mediaQuery.matches));
    this.authService.userData.subscribe(userData => {
      this.user = userData;
      console.log('Datos del usuario en Config:', this.user);
    });
  }

  confirm(): void {
    if(this.firstName.length > 0){
      this.modal.dismiss('confirm');
      const uid: string = this.authService.getUid();
      this.firestoreService.updateUserName(uid, this.firstName).then(() => {
        if (this.user) {
          this.user.firstName = this.firstName;
        }
      });
    }else{
      this.modal.dismiss('confirm');
    }
  }

  initiDarkPalette(isDark: boolean): void{
    this.paletteToggle = isDark;
    this.toogleDarkPalette(isDark);
  }

  toogleDarkPalette(shouldAdd: boolean): void{
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

  toggleChange(event: CustomEvent){
    this.toogleDarkPalette((event.detail.checked));
  }

  cancel(): void {
    this.modal.dismiss(null, 'cancel');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {

  }

  logOut(): void{
    this.authService.logout().then((): void => {this.router.navigate(['/login'])});
  }

  navigateToOrders(): void {

  }

  changeName(): void{

  }

}
