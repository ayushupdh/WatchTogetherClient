import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GroupsParamList } from "./GroupsTypes";
import { GroupsMain } from "./GroupsMain";

type GroupsNavigatorProps = {};

const Stack = createStackNavigator<GroupsParamList>();

const GroupsNavigator = (props: GroupsNavigatorProps) => {
  return (
    <Stack.Navigator initialRouteName="Your Groups">
      <Stack.Screen name="Your Groups" component={GroupsMain} />
    </Stack.Navigator>
  );
};

export default GroupsNavigator;
