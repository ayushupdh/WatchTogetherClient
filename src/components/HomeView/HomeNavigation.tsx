import React, { Props, useEffect, useState } from "react";
import "react-native-gesture-handler";
import {
  NavigationContainer,
  StackNavigationState,
  TypedNavigator,
} from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { HomeViewMain } from "./HomeViewMain";
import { HomeViewParamList } from "./HomeViewTypes";
import { addGroupsStack } from "../GroupsView/Navigation/GroupsStack";
import { GroupsParamList } from "../GroupsView/Navigation/GroupsTypes";
import { StackNavigationEventMap } from "@react-navigation/stack/lib/typescript/src/types";

type HomeViewNavigatorProps = {};

const Stack = createStackNavigator<HomeViewParamList>();

const HomeViewNavigator = (props: HomeViewNavigatorProps) => {
  return (
    <Stack.Navigator initialRouteName="Watch Together">
      <Stack.Screen name="Watch Together" component={HomeViewMain} />
      {addGroupsStack(Stack as any)}
    </Stack.Navigator>
  );
};

export default HomeViewNavigator;
