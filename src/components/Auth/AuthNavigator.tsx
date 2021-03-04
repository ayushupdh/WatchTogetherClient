import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator, View } from "react-native";
import Signin from "./Signin";
import Signup from "./Signup";
import { AuthParamList } from "./AuthTypes";
import { useDispatch, useSelector } from "react-redux";
import HomeScreen from "../HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { server } from "../../api/server";
import { LOAD_USER } from "../../redux/types/Authtypes";

type AuthNavigatorProps = {};

const Stack = createStackNavigator<AuthParamList>();

const AuthNavigator = (props: AuthNavigatorProps) => {
  // const user = useSelector((user: { user: any }) => user.user);
  // const [loading, setLoading] = useState(true);
  // const dispatch = useDispatch();
  // const loadUser = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: "",
  //       },
  //     };
  //     const token = await AsyncStorage.getItem("userToken");
  //     if (!token) {
  //       return;
  //     }
  //     config.headers["Authorization"] = `Bearer ${token}`;
  //     const response = await server.get("/users/me", config);
  //     dispatch({
  //       type: LOAD_USER,
  //       payload: {
  //         user: {
  //           username: response.data.name,
  //         },
  //       },
  //     });
  //   } catch (error) {
  //     // If the user is unauthorised first time, remove the authtoken to reduce api calls
  //     if (error.response && error.response.status === 401) {
  //       await AsyncStorage.removeItem("userToken");
  //     }
  //     console.log("Error loading user");
  //   }
  // };

  // console.log(user);
  // if (loading) {
  //   return <ActivityIndicator />;
  // } else {
  //   if (user === null) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Signin"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  // } else {
  //   return <HomeScreen user={user} />;
  // }
  // }
};

export default AuthNavigator;
