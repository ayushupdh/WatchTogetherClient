import React from "react";
import { Provider } from "react-redux";

import { store } from "./src/redux/store";
import { AppEntry } from "./src/AppEntry";

// Main App Component wrapped with Redux provider
export default function App() {
  return (
    <Provider store={store}>
      <AppEntry />
    </Provider>
  );
}
