import { IReduxAction } from "redux/declarations/common";
import {
  EWeatherSearchActionTypes,
  IWeatherSearchState,
  IWeatherSearchPayload,
} from "redux/declarations/weatherSearch";

const initialState: IWeatherSearchState = {
  thereAreNoResults: false,
  isFetching: false,
  hasError: false,
  dailyWeather: [],
  destinationName: "",
};

const weatherSearchReducer = (
  state: IWeatherSearchState = initialState,
  action: IReduxAction<EWeatherSearchActionTypes, IWeatherSearchPayload>
): IWeatherSearchState => {
  switch (action.type) {
    case EWeatherSearchActionTypes.FETCHING:
      return {
        ...state,
        isFetching: true,
        hasError: false,
        thereAreNoResults: false,
      };
    case EWeatherSearchActionTypes.FETCHED:
      return {
        ...state,
        ...action.payload,
        isFetching: false,
        hasError: false,
        thereAreNoResults: false,
      };
    case EWeatherSearchActionTypes.NO_RESULTS:
      return {
        ...state,
        isFetching: false,
        hasError: false,
        thereAreNoResults: true,
      };
    case EWeatherSearchActionTypes.FETCH_ERROR:
      return {
        ...state,
        isFetching: false,
        hasError: true,
        thereAreNoResults: false,
      };
  }
};

export default weatherSearchReducer;
