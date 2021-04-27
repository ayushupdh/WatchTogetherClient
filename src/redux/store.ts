import reducer from "./reducers";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import authReducers from "./reducers/authReducers";

// For redux devtools
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
// For redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Instantiate redux store
export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
