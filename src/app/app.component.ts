import {Component, inject, OnInit} from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {TranslocoService} from "@ngneat/transloco";
import {LocalStorageService} from "./services/local-storage/local-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet ],
  providers: []
})
export class AppComponent implements OnInit{
  private translocoService: TranslocoService = inject(TranslocoService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private readonly LANGUAGE_KEY = 'selectedLanguage';
  constructor() {}

  ngOnInit() {
    this.loadSavedLanguage();
  }

  loadSavedLanguage(): void{
    const savedLangCode: string = this.localStorageService.getItem(this.LANGUAGE_KEY) || 'es';
    if(savedLangCode){
      this.translocoService.setActiveLang(savedLangCode);
    }
  }
}
