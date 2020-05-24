import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { APP_CONSTANTS } from '../../app.constant';
import { LatestRatesService } from '../../services/latest.rates.service';
import { LatestRatesInterface, LatestRatesDataInterface } from '../../interface/latest.rates.interface';
import { BaseCurrencyService } from 'src/app/services/base.currency.service';

@Component( {
  selector: 'staxter-dashboard',
  templateUrl: './latest.rates.component.html'
})

export class LatestRatesComponent implements OnInit {

  displayedColumns: string[] = APP_CONSTANTS.LATEST_RATES_TABLE_COLUMNS;
  dataSource: Array<LatestRatesDataInterface> = [];
  baseCurrency: string;
  currentDate: string = new Date().toISOString().slice(0,10);
  previousDate: string;
  previousDateData: object = {};
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor( 
    private latestRatesService: LatestRatesService,
    private spinner: NgxSpinnerService,
    private baseCurrencyService: BaseCurrencyService
   ) {}

  ngOnInit() {
    this.baseCurrencyService.currentBaseCurrency.subscribe( currency => {
      this.baseCurrency = currency;
      this.getLatestRates(this.currentDate, this.baseCurrency);
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  getLatestRates(date, base): void {
    this.spinner.show();
    this.latestRatesService.getLatestRates(date, base)
      .pipe(takeUntil(this.destroy$))
      .subscribe((latestRatesData: LatestRatesInterface) => {
        this.dataSource = this.formatRates(latestRatesData.rates);
        let previousDate = this.getPreviousDate(latestRatesData);
        this.getLatestRatesForPreviousDate(previousDate);
      }, error => {
        console.log(error)
      }, ()=> {
        this.spinner.hide();
      });
  }

  /*
  * Get previous date from actual date returned from API
  */
  getPreviousDate(latestRatesData): string {
    
    let currentActualDateFromData: any = new Date(latestRatesData.date);
    currentActualDateFromData = new Date(currentActualDateFromData.setDate(currentActualDateFromData.getDate()-1));
    currentActualDateFromData = currentActualDateFromData.toISOString().slice(0,10);
    return currentActualDateFromData;
  }

  /*
  * Get API result for previous date
  */
  getLatestRatesForPreviousDate(previousDate): void {

    this.latestRatesService.getLatestRates(previousDate, this.baseCurrency).subscribe((latestRatesForPreviousDate: LatestRatesInterface) => {
      this.previousDateData = latestRatesForPreviousDate.rates;
      console.log("latestRatesForPreviousDate: ", latestRatesForPreviousDate);
    }, error => {
      console.log(error)
    }, ()=> {
      // this.spinner.hide();
    });
  }

  formatRates(rates): LatestRatesDataInterface[] {

    let formattedRates = [];

    // Iterate each currency
    for( let rate in rates) {
      let rateRow = {
        currencyName: rate,
        currencyValue: rates[rate]
      };
      formattedRates.push(rateRow);
    }
    return formattedRates;
  }

  isIncreased(element): string {
    // console.log("currencyName: ", element.currencyName);
    // console.log("previousDate Value: ", this.previousDateData[element.currencyName]);
    // console.log("Current Value: ", element.currencyValue);

    return element.currencyValue > this.previousDateData[element.currencyName] 
      ? APP_CONSTANTS.INCREASED 
      : (element.currencyValue === this.previousDateData[element.currencyName] ? APP_CONSTANTS.EQUAL : APP_CONSTANTS.DECREASED ) ;
  }

  showIcon(element): string {
    return this.isIncreased(element) === APP_CONSTANTS.INCREASED 
    ? 'arrow_upward' 
    : ( this.isIncreased(element) === APP_CONSTANTS.EQUAL ? 'drag_handle' : 'arrow_downward' );
  }

  applyClass(element): string {
    return this.isIncreased(element) === APP_CONSTANTS.INCREASED 
    ? 'staxter-arrow-upward' 
    : ( this.isIncreased(element) === APP_CONSTANTS.EQUAL ? 'staxter-equal' : 'staxter-arrow-downward' );
  }
}
