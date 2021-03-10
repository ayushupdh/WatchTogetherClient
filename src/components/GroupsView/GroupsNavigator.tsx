import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GroupsParamList } from "./GroupsTypes";
import { GroupsMain } from "./GroupsMain";
import { CreateGroupForm } from "./CreateGroupForm";
import { SelectGenres } from "./SelectGenres";
import { AddFriend } from "./AddFriend";
import { SwipingView } from "./SwipingView";

type GroupsNavigatorProps = {};

const Stack = createStackNavigator<GroupsParamList>();

const GroupsNavigator = (props: GroupsNavigatorProps) => {
  return (
    <Stack.Navigator initialRouteName="Your Groups">
      <Stack.Screen name="Your Groups" component={GroupsMain} />
      <Stack.Screen name="Group Session" component={CreateGroupForm} />
      <Stack.Screen name="SelectGenres" component={SelectGenres} />
      <Stack.Screen name="Add a Friend" component={AddFriend} />
      <Stack.Screen name="SwipingView" component={SwipingView} />
    </Stack.Navigator>
  );
};

export default GroupsNavigator;
