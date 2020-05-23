import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONSTANTS } from '../../app.constant';
import { LanguageService } from '../../services/language.service';

@Component( {
  selector: 'staxter-header',
  templateUrl: './header.component.html'
} )
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarEvent = new EventEmitter();

  public currentUserFirstname: string;
  public availableLanguages: Array<Object>;
  public currentLanguage: string;
  public currentLanguageFlag: string;

  constructor(
    public translate: TranslateService,
    private languageService: LanguageService
  ) {
  }

  public ngOnInit(): void {
    this.availableLanguages = APP_CONSTANTS.AVAILABLE_LANGUAGES;
    // get default language
    const defaultLanguageObject = APP_CONSTANTS.AVAILABLE_LANGUAGES
        .filter( availableLanguageObject => availableLanguageObject.default === true )[ 0 ],
      /* get localstorage value
        If no value set, then take default language  */
      localLanguage = localStorage.getItem( APP_CONSTANTS.STAXTER_CURRENT_LANGUAGE ) || defaultLanguageObject.COUNTRY_CODE,
      /* get default language object as per localstorage value
      If no value set, then take default language  */
      localLanguageObject = APP_CONSTANTS.AVAILABLE_LANGUAGES
        .filter( availableLanguageObject => availableLanguageObject.COUNTRY_CODE === localLanguage )[ 0 ];
    // if values does not match to available language, then set default
    !localLanguageObject ? this.setCurrentLanguage( defaultLanguageObject ) : this.setCurrentLanguage( localLanguageObject );
  }

  public openSidebar(): void {
    this.toggleSidebarEvent.emit();
  }

  public onLogout(): void {
    localStorage.removeItem( APP_CONSTANTS.STAXTER_CURRENT_LANGUAGE );
  }

  public setCurrentLanguage( language ): void {
    this.currentLanguage = language.COUNTRY_NAME;
    this.currentLanguageFlag = language.COUNTRY_FLAG_ICON_CLASSNAME;
    this.translate.use( language.COUNTRY_CODE );
    this.translate.currentLang = language.COUNTRY_CODE;
    this.languageService.changeLanguage( language.COUNTRY_CODE.toUpperCase() );
    localStorage.setItem( APP_CONSTANTS.STAXTER_CURRENT_LANGUAGE, language.COUNTRY_CODE );
  }

}
