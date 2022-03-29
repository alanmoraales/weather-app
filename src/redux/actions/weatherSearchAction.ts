import { Dispatch } from "redux";
import { IReduxAction } from "redux/declarations/common";
import {
  EWeatherSearchActionTypes,
  IWeatherSearchPayload,
} from "redux/declarations/weatherSearch";
import placesService from "services/places";
import weatherService from "services/weather";

const weatherSearchAction =
  (searchKey: string) =>
  async (
    dispatch: Dispatch<
      IReduxAction<EWeatherSearchActionTypes, IWeatherSearchPayload>
    >
  ) => {
    dispatch({ type: EWeatherSearchActionTypes.FETCHING });
    try {
      const foundCities = await placesService.searchCities({ searchKey });
      const destination = foundCities[0];
      if (destination) {
        const destinationWeatherData = await weatherService.getWeatherData({
          lat: destination.lat,
          long: destination.long,
        });
        const currentMinTemperature =
          destinationWeatherData?.daily[0]?.temp.min;
        const currentMaxTemperature =
          destinationWeatherData?.daily[0]?.temp.max;
        const currentTemperature = destinationWeatherData?.current?.temp;
        const wettestDay = destinationWeatherData?.daily.reduce(
          (wettestDay, { humidity: currentHumidity }, dayIndex) => {
            const { humidity } = wettestDay;
            if (humidity < currentHumidity) {
              return { index: dayIndex, humidity: currentHumidity };
            }
            return wettestDay;
          },
          { index: 0, humidity: 0 }
        );
        dispatch({
          type: EWeatherSearchActionTypes.FETCHED,
          payload: {
            currentMaxTemperature,
            currentMinTemperature,
            currentTemperature,
            wettestDayIndex: wettestDay.index,
            dailyWeather: destinationWeatherData.daily,
            destinationName: destination.city_name,
          },
        });
      } else {
        dispatch({ type: EWeatherSearchActionTypes.NO_RESULTS });
      }
    } catch (error) {
      dispatch({ type: EWeatherSearchActionTypes.FETCH_ERROR });
    }
  };

export { weatherSearchAction };
