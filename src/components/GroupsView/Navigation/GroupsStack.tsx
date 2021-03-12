import { TypedNavigator, StackNavigationState } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import React from "react";
import { HomeViewParamList } from "../../HomeView/HomeViewTypes";
import { AddFriend } from "../AddFriend";
import { CreateGroupForm } from "../CreateGroupForm";
import { GroupsMain } from "../GroupsMain";
import { GroupsNavProps, GroupsParamList } from "./GroupsTypes";
import { SelectGenres } from "../SelectGenres";
import { SwipingView } from "../SwipingView";
/* TypedNavigator<
    HomeViewParamList | GroupsParamList,
    StackNavigationState<Record<string, object | undefined>>,
    any,
    any,
    any
  >*/

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
      <Stack.Screen name="Your Groups" component={GroupsMain} />
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
        name="SelectGenres"
        component={SelectGenres}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="Add a Friend"
        component={AddFriend}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="SwipingView"
        component={SwipingView}
        options={({ route }: GroupsNavProps<"SwipingView">) => ({
          headerLeft: null,
          headerRight: () => (
            <Ionicons
              name={"menu"}
              style={{ paddingRight: 15 }}
              size={32}
              color={"#313B68"}
            />
          ),
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
