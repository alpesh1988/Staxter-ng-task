import { Component, OnInit, ViewChild } from '@angular/core';
import { LanguageService } from './services/language.service';
import { SidebarComponent } from './common/sidebar/sidebar.component';

@Component( {
  selector: 'staxter-app',
  templateUrl: './app.component.html'
} )
export class AppComponent implements OnInit {

  @ViewChild('searchUISidebar', { static: true }) sidebar: SidebarComponent;

  public currentLanguage: string;

  constructor(
    private languageService: LanguageService ) {
  }

  public ngOnInit(): void {
    this.languageService.currentLanguage.subscribe( language => {
      this.currentLanguage = language;
    } );
  }

  public toggleSidebar() {
    this.sidebar.toggleSidebar();
  }
}
