/**
 * Modules
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ChartsModule } from 'ng2-charts';

/**
 * Services
 */
import { BaseCurrencyService } from './services/base.currency.service';
import { LanguageService } from './services/language.service';
import { UserService } from './services/user.service';
import { ExchangeApiService } from './services/exchange.api.service';

/**
 * Components
 */

import { AppComponent } from './app.component';
import { LatestRatesComponent } from './pages/latest.rates/latest.rates.component';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
import { TopFiveComponent } from './pages/top.five/top.five.component';
import { Last30daysComponent } from './pages/last30days/last30days.component';
import { LatestRatesCurrencyWiseDetailsComponent } from './pages/latest.rates.currency.wise.details/latest.rates.currency.wise.details.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory( httpClient: HttpClient ): TranslateHttpLoader {
  return new TranslateHttpLoader( httpClient, '../assets/i18n/', '.json?cacheBuster=' + environment.cacheBusterHash );
}

@NgModule( {
  declarations: [
    AppComponent,
    LatestRatesComponent,
    HeaderComponent,
    SidebarComponent,
    PageNotFoundComponent,
    TopFiveComponent,
    Last30daysComponent,
    LatestRatesCurrencyWiseDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    NgxSpinnerModule,
    SharedModule,
    ChartsModule
  ],
  entryComponents: [],
  providers: [
    BaseCurrencyService,
    LanguageService,
    UserService,
    ExchangeApiService
  ],
  bootstrap: [ AppComponent ]
} )
export class AppModule {
}
