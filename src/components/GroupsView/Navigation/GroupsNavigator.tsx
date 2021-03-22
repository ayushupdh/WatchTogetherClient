import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { GroupsParamList } from "./GroupsTypes";

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
