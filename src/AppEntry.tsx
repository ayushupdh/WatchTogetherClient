import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { server } from "./api/server";
import AuthNavigator from "./components/Auth/AuthNavigator";
import { UserType } from "./components/Auth/AuthTypes";
import BottomNavTabs from "./components/BottomNav/BottomNavigator";
import { emitter } from "./api/io/io.emit";

import { LOAD_USER } from "./redux/types/Authtypes";
import { socketClient } from "./api/io/io";
import { ActivityIndicator } from "react-native";
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
  const loadUser = async () => {
    // Get auth token for user from cache
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
      // get user information
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
    // If response is fetched, update redux
    if (response) {
      dispatch({
        type: LOAD_USER,
        payload: {
          user: response.data,
          token: fetchedtoken,
        },
      });
      // Save to cache for later user
      AsyncStorage.setItem("user", JSON.stringify(response.data));
    } else {
      // If no response, get user information from cache
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

  // Load user on component load
  useEffect(() => {
    setLoading(true);
    loadUser()
      .then(() => {
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  // Connect to socket on load
  useEffect(() => {
    if (user) {
      socketClient.connect();
      emitter.setID(user._id);
    }
  }, [user]);

  // Show Loading Screen if user is loading
  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} color="grey" />;
  } else {
    // Return either Auth pages or the main home page
    return (user === null && token === "") || !token ? (
      <AuthNavigator />
    ) : (
      <BottomNavTabs />
    );
  }
};
