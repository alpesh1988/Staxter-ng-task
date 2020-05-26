import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LatestRatesComponent } from './pages/latest.rates/latest.rates.component';
import { TopFiveComponent } from './pages/top.five/top.five.component';
import { LatestRatesCurrencyWiseDetailsComponent } from './pages/latest.rates.currency.wise.details/latest.rates.currency.wise.details.component';
import { Last30daysComponent } from './pages/last30days/last30days.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { APP_CONSTANTS } from './app.constant';

const routes: Routes = [
  {
    path: '',
    redirectTo: APP_CONSTANTS.SIDEBAR_ITEMS.LATEST_RATES.URL,
    pathMatch: 'full'
  },
  {
    path: APP_CONSTANTS.SIDEBAR_ITEMS.LATEST_RATES.URL,
    component: LatestRatesComponent
  },
  {
    path: APP_CONSTANTS.SIDEBAR_ITEMS.LATEST_RATES.URL + '/:currency',
    component: LatestRatesCurrencyWiseDetailsComponent
  },
  {
    path: APP_CONSTANTS.SIDEBAR_ITEMS.LAST_30_DAYS.URL,
    component: Last30daysComponent
  },
  {
    path: APP_CONSTANTS.SIDEBAR_ITEMS.TOP_5.URL,
    component: TopFiveComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
