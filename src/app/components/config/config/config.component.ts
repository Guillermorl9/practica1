import { Component, OnInit } from '@angular/core';
import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  imports: [IonCard, IonHeader, IonToolbar, IonTitle, IonContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonAvatar],
})
export class ConfigComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
