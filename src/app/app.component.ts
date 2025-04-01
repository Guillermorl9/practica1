import {Component, inject, OnInit} from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {TranslocoService} from "@ngneat/transloco";
import {LocalStorageService} from "./services/local-storage/local-storage.service";
import {PaletteService} from "./services/palette/palette.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet ],
  providers: []
})
export class AppComponent implements OnInit{
  private translocoService: TranslocoService = inject(TranslocoService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private paletteService: PaletteService = inject(PaletteService);
  private readonly LANGUAGE_KEY: string = 'selectedLanguage';
  private readonly PALETTE_KEY: string = 'isDark';
  constructor() {}

  ngOnInit() {
    this.loadSavedLanguage();
    this.loadSavedPalette();
  }

  loadSavedLanguage(): void{
    const savedLangCode: string = this.localStorageService.getItem(this.LANGUAGE_KEY) || 'es';
    if(savedLangCode){
      this.translocoService.setActiveLang(savedLangCode);
    }
  }

  loadSavedPalette(): void{
    const savedPaletteString: string = this.localStorageService.getItem(this.PALETTE_KEY) || 'false';
    const savedPalette: boolean = (savedPaletteString == "true");
    if(savedPalette){
      this.paletteService.toogleDarkPalette(savedPalette);
      console.log(``);
    }
  }
}
