/**
 * Modules
 */
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxSpinnerModule } from 'ngx-spinner';

/**
 * Services
 */
import { LanguageService } from './services/language.service';
import { UserService } from './services/user.service';

/**
 * Components
 */

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';


// AoT requires an exported function for factories
export function HttpLoaderFactory( httpClient: HttpClient ): TranslateHttpLoader {
  return new TranslateHttpLoader( httpClient, '../assets/i18n/', '.json?cacheBuster=' + environment.cacheBusterHash );
}

@NgModule( {
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    NgxSpinnerModule,
    SharedModule
  ],
  entryComponents: [],
  providers: [
    LanguageService,
    UserService
  ],
  bootstrap: [ AppComponent ]
} )
export class AppModule {
}
