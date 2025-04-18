import {Component, inject, OnInit} from '@angular/core';
import {IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { albums, home, bagHandle, cog} from 'ionicons/icons';
import {SharpService} from "../services/sharp/sharp.service";
import {CommonModule} from "@angular/common";
import {ConfigComponent} from "../components/config/config.component";
import {User} from "../models/User";
import {TranslocoModule} from "@ngneat/transloco";
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, TranslocoModule, IonBadge, IonTabBar, IonTabButton, IonIcon, IonLabel, CommonModule],
})
export class TabsPage implements OnInit {
  private sharpService: SharpService = inject(SharpService);
  sharpListSize: number = 0;
  user: User | null = null;
  constructor() {
    addIcons({ albums, home, bagHandle, cog });
  }

  ngOnInit() {
    this.sharpService.currentSharp.subscribe((data) => {
      this.sharpListSize = data.length;
    })
  }
}
