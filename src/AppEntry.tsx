import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { server } from "./api/server";
import AuthNavigator from "./components/Auth/AuthNavigator";
import { UserType } from "./components/Auth/AuthTypes";
import BottomNavTabs from "./components/BottomNav/BottomNavigator";
import HomeViewTabs from "./components/BottomNav/BottomNavigator";
import HomeScreen from "./components/HomeScreen";
import { LOAD_USER } from "./redux/types/Authtypes";
export const AppEntry = () => {
  const user = useSelector((state: { user: UserType }) => state.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const loadUser = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "",
        },
      };
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        return;
      }
      config.headers["Authorization"] = `Bearer ${token}`;
      const response = await server.get("/users/me", config);
      dispatch({
        type: LOAD_USER,
        payload: {
          user: {
            username: response.data.name,
          },
        },
      });
    } catch (error) {
      // If the user is unauthorised first time, remove the authtoken to reduce api calls
      if (error.response && error.response.status === 401) {
        await AsyncStorage.removeItem("userToken");
      }
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await loadUser();
    })();
    setLoading(false);
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  } else {
    return user !== null && user ? <BottomNavTabs /> : <AuthNavigator />;
  }
};
