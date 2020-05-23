import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
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
    component: DashboardComponent
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
