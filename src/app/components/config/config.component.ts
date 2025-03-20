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
import {notifications, moon} from "ionicons/icons";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  imports: [IonHeader, IonIcon, IonList, IonItem, IonLabel, IonToggle, IonToolbar, IonTitle, IonContent, IonCard, IonAvatar, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton],
})
export class ConfigComponent  implements OnInit {
  focus: boolean = false;
  constructor() {
    addIcons({notifications, moon});
  }

  ngOnInit() {}

  toggleChange(): void{
    !this.focus ? this.focus = true : this.focus = false;
    console.log(`Cambio en el toggle: ${this.focus}`);
  }

}
