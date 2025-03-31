import { inject, Injectable } from "@angular/core";
import { Translation, TranslocoLoader } from "@ngneat/transloco";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
    private http = inject(HttpClient);
    private languages: Map<string, string> = new Map<string, string>([
      ['es', "Español"],
      ['en', "English"],
      ['fr', "Français"],
      ['it', "Italiano"],
      ['pt', "Português"],
      ['el', "Ελληνική"]
    ])

    getTranslation(lang: string) {
        return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
    }

    getLanguages(): Map<string, string>{
      return this.languages;
    }

    getLanguagesKeys(): MapIterator<string>{
      return this.languages.keys()
    }

    getLanguagesValues(): MapIterator<string>{
      return this.languages.values();
    }

}
