import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { APP_CONSTANTS } from '../app.constant';

@Injectable({
  providedIn: 'root'
})
export class ExchangeApiService {
  
  constructor(
    private httpClient: HttpClient
  ) { }

  getLatestRates(date, base) {
    let params = new HttpParams();
    params = params.append(APP_CONSTANTS.BASE, base);

    return this.httpClient.get(APP_CONSTANTS.REST_API_SERVER + date, {params: params})
      .pipe(catchError(this.handleError));
  }

  // https://api.exchangeratesapi.io/history?start_at=2020-04-25&end_at=2020-05-25&symbols=USD&base=EUR
  getLast30DaysRates(startAt, endAt, base, symbols) {
    let params = new HttpParams();
    params = params.append(APP_CONSTANTS.START_AT, startAt);
    params = params.append(APP_CONSTANTS.END_AT, endAt);
    params = params.append(APP_CONSTANTS.BASE, base);
    params = params.append(APP_CONSTANTS.SYMBOLS, symbols);

    return this.httpClient.get(APP_CONSTANTS.REST_API_SERVER + APP_CONSTANTS.HISTORY, {params: params})
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log("handleError: " ,errorMessage);
    return throwError(errorMessage);
  }
}