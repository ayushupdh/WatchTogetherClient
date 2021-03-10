import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeViewMain } from "./HomeViewMain";
import { HomeViewParamList } from "./HomeViewTypes";
import { addGroupsStack } from "../GroupsView/GroupsStack";

type HomeViewNavigatorProps = {};

const Stack = createStackNavigator<HomeViewParamList>();

const HomeViewNavigator = (props: HomeViewNavigatorProps) => {
  return (
    <Stack.Navigator initialRouteName="Watch Together">
      <Stack.Screen name="Watch Together" component={HomeViewMain} />
      {addGroupsStack(Stack)}
    </Stack.Navigator>
  );
};

export default HomeViewNavigator;
