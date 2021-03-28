import { CurrentConditions } from "../interfaces/current-conditions";
import { ForecastHttpResponse } from "../interfaces/forecast";
import { LocationHttpResponse } from "../interfaces/location";

export interface IApiService {
  getLocations(query: string): Promise<LocationHttpResponse[]>;
  getCurrentConditions(key: string): Promise<CurrentConditions[]>;
  getForecasts(key: string): Promise<ForecastHttpResponse[]>;
}
