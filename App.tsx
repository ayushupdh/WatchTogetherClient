import React, { useEffect } from "react";
import { Provider } from "react-redux";
import AuthNavigator from "./src/components/Auth/AuthNavigator";
import { store } from "./src/redux/store";
import { AppEntry } from "./src/AppEntry";
import { initListeners } from "./src/components/io/initListeners";
import { socketClient } from "./src/components/io/io";
import { Socket } from "socket.io-client";
export default function App() {
  useEffect(() => {
    initListeners(socketClient);
  }, []);
  return (
    <Provider store={store}>
      <AppEntry />
    </Provider>
  );
}
