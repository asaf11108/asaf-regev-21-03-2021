import * as ApiMockService from './api.mock.service';
import { IApiService } from './api,interface';
import { LocationHttpResponse } from "../interfaces/location";
import { CurrentConditions } from "../interfaces/current-conditions";
import { ForecastHttpResponse, ForecastsHttpResponse } from '../interfaces/forecast';
// import { MatSnackBar } from '@angular/material/snack-bar';


export default class implements IApiService {

  readonly API_KEY = 'gRf4KNnswLuVm8mG3puAI1GUOGeJTu1v';
  readonly HTTP_PREFIX = 'https://cors-anywhere.herokuapp.com/';
  readonly ENDPOINT = 'http://dataservice.accuweather.com/';
  readonly BAD_REQUEST = ' Unable to retrieve data. Switched to mock data.';
  readonly apiMockService: IApiService;

  constructor(
    // private _snackBar: MatSnackBar,
  ) {
    this.apiMockService = new ApiMockService.default();
  }

  getLocations(query: string): Promise<LocationHttpResponse[]> {
    return fetch(`${this.HTTP_PREFIX}${this.ENDPOINT}locations/v1/cities/autocomplete?apikey=${this.API_KEY}&q=${encodeURIComponent(query)}`)
      .then(res => res.json() as Promise<LocationHttpResponse[]>)
      .catch(() => {
        this.handleError();
        return this.apiMockService.getLocations(query);
      })
  }

  // getCurrentConditions(key: string): Observable<CurrentConditions[]> {
  //   return this.http.get<CurrentConditions[]>(`${this.HTTP_PREFIX}${this.ENDPOINT}currentconditions/v1/${key}?apikey=${this.API_KEY}`).pipe(
  //     catchError(() => {
  //       this.handleError();
  //       return this.apiMockService.getCurrentConditions(key);
  //     })
  //   )
  // }

  // getForecasts(key: string): Observable<ForecastHttpResponse[]> {
  //   return this.http.get<ForecastsHttpResponse>(`${this.HTTP_PREFIX}${this.ENDPOINT}forecasts/v1/daily/5day/${key}?apikey=${this.API_KEY}&metric=true`).pipe(
  //     map(res => res.DailyForecasts),
  //     catchError(() => {
  //       this.handleError();
  //       return this.apiMockService.getForecasts(key);
  //     })
  //   )
  // }

  handleError(): void {
    // this._snackBar.open(this.BAD_REQUEST, '', { duration: 2000 });
    // this.favoriteLocationsStore.setError(this.BAD_REQUEST);
  }
}
