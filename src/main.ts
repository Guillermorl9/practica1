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
import {importProvidersFrom, isDevMode} from "@angular/core";
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@ngneat/transloco';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    importProvidersFrom(IonicModule.forRoot({
      mode: 'ios',
    })), provideHttpClient(), provideTransloco({
        config: {
          availableLangs: ['es', 'fr', 'en', 'pt', 'it', 'el'],
          defaultLang: 'es',
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      })
  ],
})
