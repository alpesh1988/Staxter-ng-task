import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APP_CONSTANTS } from '../app.constant';

@Injectable()
export class BaseCurrencyService {

  public baseCurrencySource = new BehaviorSubject( APP_CONSTANTS.BASE_CURRENCIES
    .filter( currencyObject => currencyObject.default === true )[ 0 ].value );

  public currentBaseCurrency = this.baseCurrencySource.asObservable();

  public changeCurrency( currency: string ): void {
    this.baseCurrencySource.next( currency );
  }

}
