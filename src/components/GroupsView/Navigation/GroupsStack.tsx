import { TypedNavigator, StackNavigationState } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import React from "react";
import { HomeViewParamList } from "../../HomeView/Navigation/HomeViewTypes";
import { AddFriend } from "../CreateGroupView/AddFriend";
import { CreateGroupForm } from "../CreateGroupView/CreateGroupForm";
import { GroupsMain } from "../GroupsMain";
import { GroupsNavProps, GroupsParamList } from "./GroupsTypes";
import { SwipingView } from "../SwipingView/SwipingView";
import { GroupInfo } from "../GroupInfo/GroupInfo";
import { Results } from "../SwipingView/Results";

// Custom Group Stack to be used in Home View and Groups View
export const addGroupsStack = (
  Stack: TypedNavigator<
    HomeViewParamList | GroupsParamList,
    StackNavigationState<Record<string, object | undefined>>,
    any,
    any,
    any
  >
) => {
  return (
    <>
      <Stack.Screen
        name="Your Groups"
        component={GroupsMain}
        options={() => ({ headerBackTitleVisible: false })}
      />
      <Stack.Screen
        name="Create a Group"
        component={CreateGroupForm}
        options={({ route }: GroupsNavProps<"SwipingView">) => ({
          title:
            route.params && route.params.groupName
              ? route.params.groupName
              : "Create a Group",
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name="GroupInfo"
        component={GroupInfo}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="Add a Friend"
        component={AddFriend}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="Results"
        component={Results}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="SwipingView"
        component={SwipingView}
        options={({ route }: GroupsNavProps<"SwipingView">) => ({
          headerLeft: null,
          title:
            route.params && route.params.groupName
              ? route.params.groupName
              : "Watch Together",
          headerBackTitleVisible: false,
        })}
      />
    </>
  );
};
