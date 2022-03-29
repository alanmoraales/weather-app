import { createWrapper } from "next-redux-wrapper";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const makeStore = () => createStore(reducers, applyMiddleware(thunk));

export const wrapper = createWrapper(makeStore);
