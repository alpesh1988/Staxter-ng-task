import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { APP_CONSTANTS } from '../../app.constant';
import { LatestRatesService } from '../../services/latest.rates.service';
import { BaseCurrencyService } from '../../services/base.currency.service';
import { LatestRatesInterface, LatestRatesDataInterface } from '../../interface/latest.rates.interface';
import { TopFiveInterface } from '../../interface/top.five.interface';

@Component({
  selector: 'app-top.five',
  templateUrl: './top.five.component.html'
})
export class TopFiveComponent implements OnInit {

  displayedColumns: string[] = APP_CONSTANTS.TOP_FIVE_TABLE_COLUMNS;
  dataSource: Array<TopFiveInterface> = [];
  tempDataSource:  Array<TopFiveInterface> = []
  baseCurrency: string;
  currentDate: string = new Date().toISOString().slice(0,10);
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
        this.tempDataSource = this.formatRates(latestRatesData.rates);
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
      // console.log("latestRatesForPreviousDate: ", latestRatesForPreviousDate);
      this.createSetOfDataForDifferenceInCurrencies();
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

  // Default Increased tab selected
  createSetOfDataForDifferenceInCurrencies(): void {
    // console.log("Current Data: ", this.tempDataSource);
    // console.log("previousDateData Data: ", this.previousDateData);

    for( let currency of this.tempDataSource) {
      let difference = currency.currencyValue - this.previousDateData[currency.currencyName];
      currency['difference'] = difference;
      currency['differencePercentage'] = (100*difference) / this.previousDateData[currency.currencyName];
    }
    this.dataSource = this.tempDataSource.sort((a, b) => b.difference - a.difference).slice(0,APP_CONSTANTS.TOP_CURRENCIES_LIMIT);
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    // Decreased tab selected
    if(tabChangeEvent.index === 1) {
      this.dataSource = this.tempDataSource.sort((a, b) => a.difference - b.difference).slice(0,APP_CONSTANTS.TOP_CURRENCIES_LIMIT);
    } else { // Increased tab selected
      this.dataSource = this.tempDataSource.sort((a, b) => b.difference - a.difference).slice(0,APP_CONSTANTS.TOP_CURRENCIES_LIMIT);
    }
  }

}
