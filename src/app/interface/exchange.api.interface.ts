export interface ExchangeApiLatestRatesInterface {
    base: string;
    date: string;
    rates: object;
}

export interface ExchangeApiLatestRatesDataInterface {
    currencyName: string;
    currencyValue: number;
}