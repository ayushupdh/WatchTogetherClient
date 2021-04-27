import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeViewMain } from "../HomeViewMain";
import { HomeViewParamList } from "./HomeViewTypes";
import { addGroupsStack } from "../../GroupsView/Navigation/GroupsStack";

import { SelectOptions } from "../SelectOptions";

type HomeViewNavigatorProps = {};

const Stack = createStackNavigator<HomeViewParamList>();

// Navigator for Home View
const HomeViewNavigator = (props: HomeViewNavigatorProps) => {
  return (
    <Stack.Navigator initialRouteName="Watch Together">
      <Stack.Screen name="Watch Together" component={HomeViewMain} />
      <Stack.Screen
        name="Select options"
        component={SelectOptions}
        options={() => ({ headerBackTitle: "Back" })}
      />
      {addGroupsStack(Stack as any)}
    </Stack.Navigator>
  );
};

export default HomeViewNavigator;
