import { IWeatherData } from "@declarations/weather";

interface IWeatherSearchState {
  thereAreNoResults: boolean;
  isFetching: boolean;
  hasError: boolean;
  currentMinTemperature?: number;
  currentMaxTemperature?: number;
  currentTemperature?: number;
  wettestDayIndex?: number;
  dailyWeather: IWeatherData["daily"];
  destinationName: string;
}

export type { IWeatherSearchState };
