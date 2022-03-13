import { weatherApi } from "services/http";
import { IGetWeatherData, IWeatherData } from "@declarations/weather";
import environment from "@constants/environment";

const { weatherApiKey } = environment;

const WeatherService = () => {
  const getWeatherData = async ({
    lat,
    long,
  }: IGetWeatherData): Promise<IWeatherData> =>
    weatherApi.get<IWeatherData>(
      `/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,alerts&units=metric&appid=${weatherApiKey}`
    );

  return {
    getWeatherData,
  };
};

const weatherService = WeatherService();

export default weatherService;
