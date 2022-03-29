import { IWeatherData } from "@declarations/weather";

interface IWeatherSearchPayload {
  currentMinTemperature?: number;
  currentMaxTemperature?: number;
  currentTemperature?: number;
  wettestDayIndex?: number;
  dailyWeather: IWeatherData["daily"];
  destinationName: string;
}

export type { IWeatherSearchPayload };
