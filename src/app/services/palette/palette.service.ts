import {inject, Injectable} from '@angular/core';
import {LocalStorageService} from "../local-storage/local-storage.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaletteService {
  // Services
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  // Constants
  private readonly PALETTE_KEY: string = 'isDark';
  // Variables
  private paletteToggleString: string = this.localStorageService.getItem(this.PALETTE_KEY) || 'false';
  paletteToggle: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.paletteToggleString == 'true');
  constructor() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.addEventListener('change', (mediaQuery) => this.toggleDarkPalette(mediaQuery.matches));
    const savedTheme = this.paletteToggleString === 'true';
    document.documentElement.classList.toggle('ion-palette-dark', savedTheme);
    console.log(`Palette Service: ${this.paletteToggle.value}`);
  }

  // Toggle the dark palette
  toggleDarkPalette(isDark: boolean): void {
    console.log(`Palette Service. Toggle : ${isDark}`);
    document.documentElement.classList.toggle('ion-palette-dark', isDark);
    this.localStorageService.setItem(this.PALETTE_KEY, isDark.toString());
  }

}
