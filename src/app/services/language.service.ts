import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APP_CONSTANTS } from '../app.constant';

@Injectable()
export class LanguageService {

  public languageSource = new BehaviorSubject( APP_CONSTANTS.AVAILABLE_LANGUAGES
    .filter( languageObject => languageObject.default === true )[ 0 ].COUNTRY_CODE.toUpperCase() );

  public currentLanguage = this.languageSource.asObservable();

  public changeLanguage( language: string ): void {
    this.languageSource.next( language );
  }

}
