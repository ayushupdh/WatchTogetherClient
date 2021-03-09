import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GroupsParamList } from "./GroupsTypes";
import { GroupsMain } from "./GroupsMain";
import { CreateGroupForm } from "./CreateGroupForm";

type GroupsNavigatorProps = {};

const Stack = createStackNavigator<GroupsParamList>();

const GroupsNavigator = (props: GroupsNavigatorProps) => {
  return (
    <Stack.Navigator initialRouteName="Your Groups">
      <Stack.Screen name="Your Groups" component={GroupsMain} />
      <Stack.Screen name="Group Session" component={CreateGroupForm} />
    </Stack.Navigator>
  );
};

export default GroupsNavigator;
