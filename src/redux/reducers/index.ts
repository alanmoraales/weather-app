import { combineReducers } from "redux";
import weatherSearchReducer from "./weatherSearchReducer";

const reducers = combineReducers({
  weatherSearch: weatherSearchReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
