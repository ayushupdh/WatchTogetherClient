import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { server } from "./api/server";
import AuthNavigator from "./components/Auth/AuthNavigator";
import { UserType } from "./components/Auth/AuthTypes";
import HomeScreen from "./components/HomeScreen";
import { LOAD_USER } from "./redux/types/Authtypes";
export const AppEntry = () => {
  const user = useSelector((state: { user: UserType }) => state.user);
  console.log(user);
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
      console.log("token");
      console.log(token);
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
      console.log("");
    } catch (error) {
      // If the user is unauthorised first time, remove the authtoken to reduce api calls
      if (error.response && error.response.status === 401) {
        await AsyncStorage.removeItem("userToken");
      }
      console.log("Error loading user");
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await loadUser();
      console.log("User in useeffect");
      console.log(user);
    })();
    setLoading(false);
  }, []);
  console.log(user);
  if (loading) {
    return <ActivityIndicator />;
  } else {
    if (user !== null && user) {
      return <HomeScreen user={user} />;
    } else {
      return <AuthNavigator />;
    }
  }
};
