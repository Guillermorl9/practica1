import {Component, inject, OnInit} from '@angular/core';
import {IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personAdd, cartSharp, bagHandle, cog} from 'ionicons/icons';
import {SharpService} from "../services/sharp/sharp.service";
import {CommonModule} from "@angular/common";
import {ConfigComponent} from "../components/config/config.component";
import {User} from "../models/User";
import {TranslocoModule} from "@ngneat/transloco";
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, TranslocoModule, IonBadge, IonTabBar, IonTabButton, IonIcon, IonLabel, CommonModule, ConfigComponent],
})
export class TabsPage implements OnInit {
  private sharpService: SharpService = inject(SharpService);
  sharpListSize: number = 0;
  user: User | null = null;
  constructor() {
    addIcons({ personAdd, cartSharp, bagHandle, cog });
  }

  ngOnInit() {
    this.sharpService.currentSharp.subscribe((data) => {
      this.sharpListSize = data.length;
    })
  }
}
