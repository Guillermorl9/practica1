import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {
  IonAlert,
  IonAvatar,
  IonButton, IonButtons,
  IonCard, IonCardContent,
  IonCardHeader, IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonText,
  IonTitle, IonToggle,
  IonToolbar
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {personOutline, call, person, people, mail, trendingUpOutline, logOutOutline, moonOutline, languageOutline, personAddOutline} from "ionicons/icons";
import {User} from "../../models/User";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {CustomHeaderComponent} from "../custom-header/custom-header/custom-header.component";
import {IonModal} from "@ionic/angular/standalone";
import { OverlayEventDetail } from '@ionic/core/components';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {FirebaseService} from "../../services/firebase-service/firebase.service";
import {TranslocoModule, TranslocoService} from "@ngneat/transloco";
import {TranslocoHttpLoader} from "../../../transloco-loader";
import {CommonModule} from "@angular/common";
import {LocalStorageService} from "../../services/local-storage/local-storage.service";
import {PaletteService} from "../../services/palette/palette.service";
import {IonicModule} from "@ionic/angular";
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  imports: [IonHeader, ReactiveFormsModule, IonText, IonAlert, CommonModule, IonSelect, IonSelectOption, TranslocoModule, IonToggle, FormsModule, IonButtons, IonModal, IonInput, CustomHeaderComponent, IonIcon, RouterLink, IonList, IonItem, IonLabel, IonToggle, IonToolbar, IonTitle, IonContent, IonCard, IonAvatar, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton],
})
export class ConfigComponent implements OnInit {
  @ViewChild('personalDataModal') personalDataModal!: IonModal;
  @ViewChild('contactModal') contactModal!: IonModal;

  private authService: AuthService = inject(AuthService);
  private firestoreService: FirebaseService = inject(FirebaseService);
  private translocoService: TranslocoService = inject(TranslocoService);
  private translocoHttpLoader: TranslocoHttpLoader = inject(TranslocoHttpLoader);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private paletteService: PaletteService = inject(PaletteService);
  private readonly LANGUAGE_KEY: string = 'selectedLanguage';
  languages: Array<string> = Array.from(this.translocoHttpLoader.getLanguagesValues());
  languageMap: Map<string, string> = this.translocoHttpLoader.getLanguages();
  invertedLanguageMap: Map<string, string> = new Map();
  currentLanguage: string = '';
  user: User | null = null;
  firstName: string = this.authService.getFirstName();
  isDark: boolean = false;
  formulario: FormGroup;
  private phonePattern: RegExp = /^[0-9]{9}$/;
  showAlert: boolean = false;

  constructor(private router: Router, private form: FormBuilder) {
    this.formulario = this.form.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
      email: ['', [Validators.required, Validators.email]],
    })
    addIcons({personOutline, call, person, people, mail, trendingUpOutline, logOutOutline, moonOutline, languageOutline, personAddOutline});
  }

  ngOnInit() {
    this.authService.userData.subscribe(userData => {
      this.user = userData;
    });
    this.paletteService.paletteToggle.subscribe((isDark) => {
      this.isDark = isDark;
    })
    this.languageMap.forEach((value, key) => {
      this.invertedLanguageMap.set(value, key);
    })
    this.currentLanguage = this.languageMap.get(this.localStorageService.getItem('selectedLanguage') || 'es') || 'es';
  }

  hasErrors(controlName: string, errorName: string): boolean | undefined {
    return this.formulario.get(controlName)?.hasError(errorName) && this.formulario.get(controlName)?.touched
  }

  enviar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.showAlert = true;
  }

  changeLanguage(event: CustomEvent): void  {
    const selectedLanguageName = event.detail.value;
    const langCode: string | undefined = this.invertedLanguageMap.get(selectedLanguageName);

    if (langCode) {
      this.translocoService.setActiveLang(langCode);
      this.currentLanguage = selectedLanguageName;
      this.localStorageService.removeItem(this.LANGUAGE_KEY);
      this.localStorageService.setItem(this.LANGUAGE_KEY, langCode);
    }
  }

  confirm(): void {
    if(this.firstName.length > 0){
      this.personalDataModal.dismiss('confirm');
      const uid: string = this.authService.getUid();
      this.firestoreService.updateUserName(uid, this.firstName).then(() => {
        if (this.user) {
          this.user.firstName = this.firstName;
        }
      });
    }else{
      this.personalDataModal.dismiss('confirm');
    }
  }

  toggleChange(){
    this.paletteService.toogleDarkPalette(this.isDark);
  }

  cancel(): void {
    this.personalDataModal.dismiss(null, 'cancel');
  }

  confirmContactModal(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.showAlert = true;
    setTimeout(() => {
      this.contactModal.dismiss(null, 'confirm');
    }, 500);
  }

  cancelContactModal(): void {
    this.contactModal.dismiss(null, 'cancel');
  }

  logOut(): void{
    this.localStorageService.clear();
    const langCode: string = navigator.language.split('-')[0];
    this.translocoService.setActiveLang(langCode);
    this.paletteService.toogleDarkPalette(false);
    this.authService.logout().then((): void => {this.router.navigate(['/login'])});
  }
}
