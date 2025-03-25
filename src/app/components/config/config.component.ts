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
import {personOutline, trendingUpOutline, logOutOutline} from "ionicons/icons";
import {UserService} from "../../services/user/user.service";
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
  imports: [IonHeader, FormsModule, IonButtons, IonModal, IonInput, CustomHeaderComponent, IonIcon, RouterLink, IonList, IonItem, IonLabel, IonToggle, IonToolbar, IonTitle, IonContent, IonCard, IonAvatar, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton],
})
export class ConfigComponent  implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  user: User | null = null;
  firstName: string = this.authService.getFirstName();
  constructor(private userService: UserService, private authService: AuthService, private router: Router, private firestoreService: FirebaseService) {
    addIcons({personOutline, trendingUpOutline, logOutOutline});
  }

  ngOnInit() {
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

  cancel(): void {
    this.modal.dismiss(null, 'cancel');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {

  }

  logOut(): void{
    this.authService.logout().then((): void => {this.router.navigate(['/login'])});
  }

  changeName(): void{

  }

}
