import React from "react";
import { Provider } from "react-redux";
import AuthNavigator from "./src/components/Auth/AuthNavigator";
import { store } from "./src/redux/store";
import { AppEntry } from "./src/AppEntry";
export default function App() {
  console.log("running");
  return (
    <Provider store={store}>
      <AppEntry />
    </Provider>
  );
}
