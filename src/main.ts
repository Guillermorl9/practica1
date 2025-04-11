import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';
import {PreloadAllModules, provideRouter, RouteReuseStrategy, withPreloading} from "@angular/router";
import {IonicModule, IonicRouteStrategy} from "@ionic/angular";
import {provideIonicAngular} from "@ionic/angular/standalone";
import {provideHttpClient} from "@angular/common/http";
import {routes} from "./app/app.routes";
import { provideAuth, getAuth } from '@angular/fire/auth';
import {importProvidersFrom, isDevMode, LOCALE_ID} from "@angular/core";
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@ngneat/transloco';
import {registerLocaleData} from "@angular/common";
import localeEs from '@angular/common/locales/es';
import {provideLottieOptions} from "ngx-lottie";
import {provideAnimations} from "@angular/platform-browser/animations";
import player from "lottie-web";
registerLocaleData(localeEs);

export function playerFactory() {
  return player;
}
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'es-ES' },
    provideIonicAngular(),
    provideAnimations(),
    provideLottieOptions({
      player: playerFactory
    }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    importProvidersFrom(IonicModule.forRoot({
      mode: 'ios',
    })), provideHttpClient(), provideTransloco({
        config: {
          availableLangs: ['es', 'fr', 'en', 'pt', 'it', 'el', 'ru', 'de', 'ja'],
          defaultLang: 'es',
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      })
  ],
})
