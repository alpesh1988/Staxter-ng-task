import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LatestRatesComponent } from './pages/latest.rates/latest.rates.component';
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
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
