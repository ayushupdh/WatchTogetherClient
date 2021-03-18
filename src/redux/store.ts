
import reducer from "./reducers"
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import authReducers from "./reducers/authReducers";

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducer,
  composeEnhancers(applyMiddleware(thunk))
);