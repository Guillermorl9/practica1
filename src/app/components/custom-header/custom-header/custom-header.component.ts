import {Component, Input, OnInit} from '@angular/core';
import {IonHeader, IonTitle, IonToolbar} from "@ionic/angular/standalone";

@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle]
})
export class CustomHeaderComponent  implements OnInit {
  @Input() title?: string;
  @Input() collapse?: string;
  @Input() translucent: boolean = false;
  @Input() size?: string;
  constructor() { }

  ngOnInit() {}

}
