import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GroupsParamList } from "./GroupsTypes";
import { GroupsMain } from "../GroupsMain";
import { CreateGroupForm } from "../CreateGroupForm";
import { SelectGenres } from "../SelectGenres";
import { AddFriend } from "../AddFriend";
import { SwipingView } from "../SwipingView";
import { addGroupsStack } from "./GroupsStack";

type GroupsNavigatorProps = {};

const Stack = createStackNavigator<GroupsParamList>();

const GroupsNavigator = (props: GroupsNavigatorProps) => {
  return (
    <Stack.Navigator initialRouteName="Your Groups">
      {addGroupsStack(Stack)}
    </Stack.Navigator>
  );
};

export default GroupsNavigator;
