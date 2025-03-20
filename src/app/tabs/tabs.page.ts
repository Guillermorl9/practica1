import {Component, EnvironmentInjector, inject, OnInit} from '@angular/core';
import {IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personAdd, cartSharp, bagHandle, cog} from 'ionicons/icons';
import {SharpService} from "../services/sharp/sharp.service";
import {CommonModule} from "@angular/common";
import {ConfigComponent} from "../components/config/config.component";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonBadge, IonTabBar, IonTabButton, IonIcon, IonLabel, CommonModule, ConfigComponent],
})
export class TabsPage implements OnInit {
  sharpListSize: number = 0;
  constructor(private sharpService: SharpService) {
    addIcons({ personAdd, cartSharp, bagHandle, cog });
  }

  ngOnInit() {
    this.sharpService.currentSharp.subscribe((data) => {
      this.sharpListSize = data.length;
    })
  }
}
