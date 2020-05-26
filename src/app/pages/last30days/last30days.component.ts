import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { APP_CONSTANTS } from 'src/app/app.constant';
import { BaseCurrencies } from 'src/app/interface/base.currencies.interface';
import { BaseCurrencyService } from 'src/app/services/base.currency.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ExchangeApiLast30DaysDataInterface } from 'src/app/interface/exchange.api.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExchangeApiService } from 'src/app/services/exchange.api.service';

@Component({
  selector: 'app-last30days',
  templateUrl: './last30days.component.html'
})
export class Last30daysComponent implements OnInit {

  baseCurrency: string;
  comparisonCurrencies: BaseCurrencies[] = APP_CONSTANTS.LAST_30_DAYS_COMPARISON_CURRENCIES;
  comparisonCurrency: string = APP_CONSTANTS.LAST_30_DAYS_COMPARISON_CURRENCIES.filter(currency => currency.default === true)[0].value;
  currentDate: string = new Date().toISOString().slice(0,10);
  destroy$: Subject<boolean> = new Subject<boolean>();

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 52,59, 80, 81, 56, 55, 52], label: 'Series A' },
  ];

  constructor(
    private spinner: NgxSpinnerService,
    private baseCurrencyService: BaseCurrencyService,
    private exchangeApiService: ExchangeApiService
  ) { }

  ngOnInit(): void {
    this.baseCurrencyService.currentBaseCurrency.subscribe( currency => {
      this.baseCurrency = currency;
      if(this.comparisonCurrency === currency) {
        this.setDefaultCurrency();
      }
      this.getLast30DaysData(this.getLast30DaysDate(this.currentDate), this.currentDate, this.baseCurrency, this.comparisonCurrency );
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  getLast30DaysData(startAt, endAt, base, symbols): void {
    
    this.spinner.show();
    this.exchangeApiService.getLast30DaysRates(startAt, endAt, base, symbols)
      .pipe(takeUntil(this.destroy$))
      .subscribe((last30DaysData: ExchangeApiLast30DaysDataInterface) => {
        // this.dataSource = this.formatRates(latestRatesData.rates);
        // console.log("Params: ", startAt, endAt, base, symbols);
        // console.log("last30DaysData: ", last30DaysData);
        this.setChartData(last30DaysData);
      }, error => {
        console.log(error)
      }, ()=> {
        this.spinner.hide();
      });
  }

  setChartData(last30DaysData: ExchangeApiLast30DaysDataInterface): void {
    let labels = [], chartData = [];
    // console.log("last30DaysData.rates:", last30DaysData.rates);

    // Iterate each currency
    for( let rate in last30DaysData.rates) {
      labels.push(rate);
      chartData.push(last30DaysData.rates[rate][this.comparisonCurrency].toFixed(4));
    }
    // console.log("labels:", labels);
    // console.log("chartData:", chartData);
    this.barChartLabels = labels;
    this.barChartData = [
      { data: chartData, label: this.comparisonCurrency },
    ];
  }

  public comparisonCurrencyChange(comparisonCurrency):void {
    // this.baseCurrencyService.changeCurrency(baseCurrency);
    console.log("comparisonCurrencyChange", comparisonCurrency);
    this.getLast30DaysData(this.getLast30DaysDate(this.currentDate), this.currentDate, this.baseCurrency, comparisonCurrency );
  }

  setDefaultCurrency(): void {
    this.comparisonCurrency = APP_CONSTANTS.LAST_30_DAYS_COMPARISON_CURRENCIES.filter(currency => currency.default === true)[0].value;
  }

  makeDisable(Option): boolean {
    return this.baseCurrency === Option.value;
  }

  /*
  * Get previous date from actual date returned from API
  */
  getLast30DaysDate(currentDate): string {
    
    let currentActualDate: any = new Date(currentDate);
    currentActualDate = new Date(currentActualDate.setDate(currentActualDate.getDate()-30));
    currentActualDate = currentActualDate.toISOString().slice(0,10);
    return currentActualDate;
  }

}
