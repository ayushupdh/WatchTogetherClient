import { TypedNavigator, StackNavigationState } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { StackNavigationEventMap } from "@react-navigation/stack/lib/typescript/src/types";
import React, { Props } from "react";
import { AddFriend } from "./AddFriend";
import { CreateGroupForm } from "./CreateGroupForm";
import { GroupsMain } from "./GroupsMain";
import { GroupsNavProps, GroupsParamList } from "./GroupsTypes";
import { SelectGenres } from "./SelectGenres";
import { SwipingView } from "./SwipingView";

export const addGroupsStack = (
  Stack: TypedNavigator<
    GroupsParamList,
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
