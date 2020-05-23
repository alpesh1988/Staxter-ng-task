import { Component } from '@angular/core';

@Component({
  template: `<h2 class="text-center">Page not found</h2><p class="text-center staxter-mt-1">
    <a [routerLink]="['/']"> Go back to Dashboard</a></p>`
})
export class PageNotFoundComponent {}
