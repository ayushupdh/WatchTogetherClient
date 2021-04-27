import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Signin from "./Signin";
import Signup from "./Signup";
import { AuthParamList } from "./AuthTypes";

type AuthNavigatorProps = {};

const Stack = createStackNavigator<AuthParamList>();

// Navigator to navigate in between Signin and Sign up Screen
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
