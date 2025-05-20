import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {addIcons} from "ionicons";
import {personOutline, cameraOutline, call, person, people, mail, trendingUpOutline, logOutOutline, moonOutline, languageOutline, personAddOutline} from "ionicons/icons";
import {User} from "../../models/User";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {IonModal} from "@ionic/angular/standalone";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {FirebaseService} from "../../services/firebase-service/firebase.service";
import {TranslocoModule, TranslocoService} from "@ngneat/transloco";
import {TranslocoHttpLoader} from "../../../transloco-loader";
import {CommonModule} from "@angular/common";
import {LocalStorageService} from "../../services/local-storage/local-storage.service";
import {PaletteService} from "../../services/palette/palette.service";
import {IonicModule} from "@ionic/angular";
import {PhotoService} from "../../services/photo/photo.service"; import { colorPaletteOutline, notificationsOutline, lockClosedOutline, cardOutline, informationCircleOutline } from 'ionicons/icons';
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, TranslocoModule, FormsModule, RouterLink, IonicModule],
})
export class ConfigComponent implements OnInit {
  //Decorators
  @ViewChild('personalDataModal') personalDataModal!: IonModal;
  @ViewChild('contactModal') contactModal!: IonModal;

  //Services
  private authService: AuthService = inject(AuthService);
  private firestoreService: FirebaseService = inject(FirebaseService);
  private translocoService: TranslocoService = inject(TranslocoService);
  private translocoHttpLoader: TranslocoHttpLoader = inject(TranslocoHttpLoader);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private paletteService: PaletteService = inject(PaletteService);
  private photoService: PhotoService = inject(PhotoService);

  // Constants
  private readonly LANGUAGE_KEY: string = 'selectedLanguage';
  private readonly PHONE_PATTERN: RegExp = /^[0-9]{9}$/;
  private readonly MAX_IMAGE_SIZE: number = 1048487;

  //Variables
  profileImage: string = "https://ionicframework.com/docs/img/demos/avatar.svg";
  languages: Array<string> = Array.from(this.translocoHttpLoader.getLanguagesValues());
  languageMap: Map<string, string> = this.translocoHttpLoader.getLanguages();
  invertedLanguageMap: Map<string, string> = new Map();
  currentLanguage: string = '';
  user: User | null = null;
  firstName: string = this.authService.getFirstName();
  isDark: boolean = false;
  formulario: FormGroup;
  showAlert: boolean = false;
  currentTheme: string = '';
  themes: string[] = ['Morado apagado', 'Azul predeterminado'];
  maxSize: boolean = false;

  constructor(private router: Router, private form: FormBuilder) {
    this.formulario = this.form.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(this.PHONE_PATTERN)]],
      email: ['', [Validators.required, Validators.email]],
    })
    addIcons({personOutline, cameraOutline, call, person, people, mail, trendingUpOutline, logOutOutline, moonOutline, languageOutline, personAddOutline, colorPaletteOutline, notificationsOutline, lockClosedOutline, cardOutline, informationCircleOutline});
  }

  ngOnInit() {
    this.authService.userData.subscribe(userData => {
      this.user = userData;
      this.profileImage = userData?.profileImage || this.profileImage;
    });
    this.paletteService.paletteToggle.subscribe((isDark) => {
      this.isDark = isDark;
    })
    this.languageMap.forEach((value, key) => {
      this.invertedLanguageMap.set(value, key);
    })
    this.currentLanguage = this.languageMap.get(this.localStorageService.getItem('selectedLanguage') || 'es') || 'es';
 this.applyTheme('Morado apagado'); // Apply default theme on init
  }

  private themesConfig: { [key: string]: { [key: string]: string } } = {
    'Morado apagado': {
      '--ion-color-primary': '#6a4e8a',
      '--ion-color-primary-rgb': '106, 78, 138',
      '--ion-color-primary-contrast': '#ffffff',
      '--ion-color-primary-contrast-rgb': '255, 255, 255',
      '--ion-color-primary-shade': '#5d447a',
      '--ion-color-primary-tint': '#795f96',
    },
    'Azul predeterminado': {
      '--ion-color-primary': '#3880ff',
      '--ion-color-primary-rgb': '56, 128, 255',
      '--ion-color-primary-contrast': '#ffffff',
      '--ion-color-primary-contrast-rgb': '255, 255, 255',
      '--ion-color-primary-shade': '#3171e0',
      '--ion-color-primary-tint': '#4c8dff',
    },
    // Add other themes here if needed
  };


  // Change user profile image
  async changeImage(): Promise<void> {
    await this.photoService.importPhoto().then((newImage) => {
      if (newImage.length < this.MAX_IMAGE_SIZE) {
        this.profileImage = 'data:image/png;base64,' + newImage;
        this.firestoreService.updateProfileImage(this.authService.getUid(), this.profileImage);
      }
 else {
        this.maxSize = true;
      }
    }).catch((error) => {
      console.error('Error importing image:', error);
    });
  }

  // Check forms errors
  hasErrors(controlName: string, errorName: string): boolean | undefined {
    return this.formulario.get(controlName)?.hasError(errorName) && this.formulario.get(controlName)?.touched
  }

  // Menu option: Change Personal Data (Confirm modal button)
  confirmChangePersonalData(): void {
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
  // Menu option: Change Personal Data (Cancel modal button)
  cancelChangePersonalData(): void {
    this.personalDataModal.dismiss(null, 'cancel');
  }

  // Menu option: Dark theme (Enable / disabled)
  toggleChange(){
    this.paletteService.toggleDarkPalette(this.isDark);
  }

  // Menu option: Language
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

  // Menu option: Theme
  changeTheme(event: CustomEvent): void {
 const selectedThemeName = event.detail.value;
 this.applyTheme(selectedThemeName);
  }

  // Apply theme based on name
  private applyTheme(themeName: string): void {
    const body = document.body;
    // Remove existing theme classes
    this.themes.forEach(theme => {
      const themeClass = `theme-${theme.toLowerCase().replace(/\s/g, '-')}`;
 body.classList.remove(themeClass);
    });
    // Add the selected theme class
    const selectedThemeClass = `theme-${themeName.toLowerCase().replace(/\s/g, '-')}`;
 body.classList.add(selectedThemeClass);
 this.currentTheme = themeName; // Update currentTheme
  }

  // Menu option: Contact Form (Confirm modal button)
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
  // Menu option: Contact Form (Cancel modal button)
  cancelContactModal(): void {
    this.contactModal.dismiss(null, 'cancel');
  }

  // Menu option: Log out
  logOut(): void{
    this.localStorageService.clear();
    const langCode: string = navigator.language.split('-')[0];
    this.translocoService.setActiveLang(langCode);
    this.paletteService.toggleDarkPalette(false);
    this.authService.logout().then((): void => {this.router.navigate(['/login'])});
  }
}
