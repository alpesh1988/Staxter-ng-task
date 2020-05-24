import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { APP_CONSTANTS } from '../../app.constant';
import { NavigationItem } from '../../app.interfaces';
import { BaseCurrencies } from '../../interface/base.currencies.interface';
import { BaseCurrencyService } from '../../services/base.currency.service';

@Component( {
  selector: 'staxter-sidebar',
  templateUrl: './sidebar.component.html'
} )
export class SidebarComponent implements OnInit {

  @ViewChild('matSidenav', { static: true }) sidebar: MatSidenav;

  public showScrollToTopButton = false;
  public activeNavItem: NavigationItem;
  public navigationItems: Array<NavigationItem>;

  baseCurrencies: BaseCurrencies[] = APP_CONSTANTS.BASE_CURRENCIES;
  baseCurrency: string = APP_CONSTANTS.BASE_CURRENCIES.filter(currency => currency.default === true)[0].value;

  constructor( 
    private router: Router,
    private baseCurrencyService: BaseCurrencyService
  ) {}

  public ngOnInit(): void {
    this.initializeNavItems();

    this.activeNavItem = this.navigationItems.find( item => this.router.url.includes( item.url ) );

    this.router.events.pipe( filter( event => event instanceof NavigationEnd ) )
      .subscribe( ( event: NavigationEnd ) => {
        for ( const item of this.navigationItems ) {
          if ( event.urlAfterRedirects.includes( item.url ) ) {
            this.activeNavItem = item;
          }
        }
      } );
  }

  public baseCurrencyChange(baseCurrency):void {
    this.baseCurrencyService.changeCurrency(baseCurrency);
  }

  public scrollHandler(): void {
    const currentScrollPosition = document.querySelector( 'mat-sidenav-content' ).scrollTop;
    this.showScrollToTopButton = currentScrollPosition > APP_CONSTANTS.SHOW_SCROLL_TO_TOP_BUTTON_POSITION;
  }

  public scrollToTop(): void {
    document.querySelector( 'mat-sidenav-content' ).scroll( { top: 0, left: 0, behavior: 'smooth' } );
  }

  public toggleSidebar(): void {
    this.sidebar.opened = !this.sidebar.opened;
  }

  public navigateToPage( index: number ): void {
    this.sidebar.opened = false;
    this.activeNavItem = this.navigationItems[ index ];
    this.router.navigate( [ {
      outlets: { primary: [ this.navigationItems[ index ].url ] }
    } ] )
      .then();
  }

  private initializeNavItems(): void {

    this.navigationItems = [];

    const LATEST_RATES: NavigationItem = {
      name: APP_CONSTANTS.SIDEBAR_ITEMS.LATEST_RATES.NAME,
      url: APP_CONSTANTS.SIDEBAR_ITEMS.LATEST_RATES.URL,
      icon: APP_CONSTANTS.SIDEBAR_ITEMS.LATEST_RATES.icon
    };

    const LAST_30_DAYS: NavigationItem = {
      name: APP_CONSTANTS.SIDEBAR_ITEMS.LAST_30_DAYS.NAME,
      url: APP_CONSTANTS.SIDEBAR_ITEMS.LAST_30_DAYS.URL,
      icon: APP_CONSTANTS.SIDEBAR_ITEMS.LAST_30_DAYS.icon
    };

    const TOP_5: NavigationItem = {
      name: APP_CONSTANTS.SIDEBAR_ITEMS.TOP_5.NAME,
      url: APP_CONSTANTS.SIDEBAR_ITEMS.TOP_5.URL,
      icon: APP_CONSTANTS.SIDEBAR_ITEMS.TOP_5.icon
    };

    this.navigationItems.push( LATEST_RATES, LAST_30_DAYS, TOP_5 );
  }
}
