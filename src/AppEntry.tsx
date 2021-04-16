import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { server } from "./api/server";
import AuthNavigator from "./components/Auth/AuthNavigator";
import { UserType } from "./components/Auth/AuthTypes";
import BottomNavTabs from "./components/BottomNav/BottomNavigator";
import { emitter } from "./api/io/io.emit";
import { SplashScreen } from "./components/UtilComponents/SplashScreen";

import { LOAD_USER } from "./redux/types/Authtypes";
export const AppEntry = () => {
  const { user, token } = useSelector(
    ({ auth }: { auth: { user: UserType; userToken: string } }) => {
      return {
        user: auth.user,
        token: auth.userToken,
      };
    }
  );

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  //TODO:  Work on opening login only when the server says unauthorized
  const loadUser = async () => {
    let fetchedtoken: string | null = null;
    let response: any;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "",
        },
      };
      fetchedtoken = await AsyncStorage.getItem("userToken");

      if (!fetchedtoken) {
        return;
      }
      config.headers["Authorization"] = `Bearer ${fetchedtoken}`;
      response = await server.get("/users/me", config);
    } catch (error) {
      console.log(error);
      // If the user is unauthorised first time, remove the authtoken to reduce api calls
      if (error.response && error.response.status === 401) {
        await AsyncStorage.removeItem("userToken");
        await AsyncStorage.removeItem("user");
        return false;
      }
    }
    if (response) {
      dispatch({
        type: LOAD_USER,
        payload: {
          user: response.data,
          token: fetchedtoken,
        },
      });
      AsyncStorage.setItem("user", JSON.stringify(response.data));
    } else {
      let usr = await AsyncStorage.getItem("user");

      usr = JSON.parse(usr ? usr : "");
      dispatch({
        type: LOAD_USER,
        payload: {
          user: usr,
          token: fetchedtoken,
        },
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    loadUser().then(() => {
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    if (user) {
      emitter.setID(user._id);
    }
  }, [user]);

  if (loading) {
    return <SplashScreen />;
  } else {
    return (user === null && token === "") || !token ? (
      <AuthNavigator />
    ) : (
      <BottomNavTabs />
    );
  }
};
