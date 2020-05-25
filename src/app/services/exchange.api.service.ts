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