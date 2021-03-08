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
};

export default AuthNavigator;
