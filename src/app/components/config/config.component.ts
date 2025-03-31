import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {
  IonAvatar,
  IonButton, IonButtons,
  IonCard, IonCardContent,
  IonCardHeader, IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption,
  IonTitle, IonToggle,
  IonToolbar
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {personOutline, trendingUpOutline, logOutOutline, moonOutline, languageOutline} from "ionicons/icons";
import {User} from "../../models/User";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {CustomHeaderComponent} from "../custom-header/custom-header/custom-header.component";
import {IonModal} from "@ionic/angular/standalone";
import { OverlayEventDetail } from '@ionic/core/components';
import {FormsModule} from "@angular/forms";
import {FirebaseService} from "../../services/firebase-service/firebase.service";
import {TranslocoModule, TranslocoService} from "@ngneat/transloco";
import {TranslocoHttpLoader} from "../../../transloco-loader";
import {CommonModule} from "@angular/common";
import {LocalStorageService} from "../../services/local-storage/local-storage.service";
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  imports: [IonHeader, CommonModule, IonSelect, IonSelectOption, TranslocoModule, IonToggle, FormsModule, IonButtons, IonModal, IonInput, CustomHeaderComponent, IonIcon, RouterLink, IonList, IonItem, IonLabel, IonToggle, IonToolbar, IonTitle, IonContent, IonCard, IonAvatar, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton],
})
export class ConfigComponent  implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  private authService: AuthService = inject(AuthService);
  private firestoreService: FirebaseService = inject(FirebaseService);
  private translocoService: TranslocoService = inject(TranslocoService);
  private translocoHttpLoader: TranslocoHttpLoader = inject(TranslocoHttpLoader);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private readonly LANGUAGE_KEY: string = 'selectedLanguage';
  languages: Array<string> = Array.from(this.translocoHttpLoader.getLanguagesValues());
  languageMap: Map<string, string> = this.translocoHttpLoader.getLanguages();
  invertedLanguageMap: Map<string, string> = new Map();
  currentLanguage: string = '';
  user: User | null = null;
  firstName: string = this.authService.getFirstName();
  paletteToggle: boolean = false;
  constructor(private router: Router) {
    addIcons({personOutline, trendingUpOutline, logOutOutline, moonOutline, languageOutline});
  }

  ngOnInit() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.initiDarkPalette(prefersDark.matches);
    prefersDark.addEventListener('change', (mediaQuery) => this.initiDarkPalette(mediaQuery.matches));
    this.authService.userData.subscribe(userData => {
      this.user = userData;
    });
    this.languageMap.forEach((value, key) => {
      this.invertedLanguageMap.set(value, key);
    })
    this.currentLanguage = this.languageMap.get(this.localStorageService.getItem('selectedLanguage') || 'es') || 'es';
  }

  changeLanguage(event: CustomEvent): void  {
    const selectedLanguageName = event.detail.value;
    const langCode: string | undefined = this.invertedLanguageMap.get(selectedLanguageName);

    if (langCode) {
      this.translocoService.setActiveLang(langCode);
      this.currentLanguage = selectedLanguageName;
      this.localStorageService.clear();
      this.localStorageService.setItem(this.LANGUAGE_KEY, langCode);
    }
  }

  confirm(): void {
    if(this.firstName.length > 0){
      this.modal.dismiss('confirm');
      const uid: string = this.authService.getUid();
      this.firestoreService.updateUserName(uid, this.firstName).then(() => {
        if (this.user) {
          this.user.firstName = this.firstName;
        }
      });
    }else{
      this.modal.dismiss('confirm');
    }
  }

  initiDarkPalette(isDark: boolean): void{
    this.paletteToggle = isDark;
    this.toogleDarkPalette(isDark);
  }

  toogleDarkPalette(shouldAdd: boolean): void{
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

  toggleChange(event: CustomEvent){
    this.toogleDarkPalette((event.detail.checked));
  }

  cancel(): void {
    this.modal.dismiss(null, 'cancel');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {

  }

  logOut(): void{
    this.localStorageService.clear();
    const langCode: string = navigator.language.split('-')[0];
    this.translocoService.setActiveLang(langCode);
    this.authService.logout().then((): void => {this.router.navigate(['/login'])});
  }

  navigateToOrders(): void {

  }

  changeName(): void{

  }

}
