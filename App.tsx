import React from "react";
import { Provider } from "react-redux";
import AuthNavigator from "./src/components/Auth/AuthNavigator";
import { store } from "./src/redux/store";

export default function App() {
  // return <HomeScreen name={user.username} />;

  return (
    <Provider store={store}>
      <AuthNavigator />
      {/* <Home /> */}
    </Provider>
  );
}
