export interface ExchangeApiLatestRatesInterface {
    base: string;
    date: string;
    rates: object;
}

export interface ExchangeApiLatestRatesDataInterface {
    currencyName: string;
    currencyValue: number;
}

export interface ExchangeApiLast30DaysDataInterface {
    base: string;
    end_at: string;
    rates: object;
    start_at: string;
}