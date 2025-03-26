import {Component, Input, OnInit} from '@angular/core';
import {IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, CommonModule]
})
export class CustomHeaderComponent  implements OnInit {
  @Input() title?: string;
  @Input() collapse?: string;
  @Input() translucent: boolean = false;
  @Input() size?: string;
  @Input() backButton?: boolean = true;
  constructor() { }

  ngOnInit() {}

}
