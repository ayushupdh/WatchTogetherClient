import {
  TypedNavigator,
  StackNavigationState,
  DefaultRouterOptions,
  Route,
  DefaultNavigatorOptions,
  StackRouterOptions,
} from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import {
  StackNavigationConfig,
  StackNavigationEventMap,
} from "@react-navigation/stack/lib/typescript/src/types";
import React, { Props } from "react";
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
        name="Group Session"
        component={CreateGroupForm}
        options={{ headerBackTitleVisible: false }}
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
          title:
            route.params && route.params.groupName
              ? route.params.groupName
              : "Single",
          headerBackTitleVisible: false,
        })}
      />
    </>
  );
};
