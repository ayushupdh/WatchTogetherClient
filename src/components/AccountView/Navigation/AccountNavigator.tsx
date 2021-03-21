import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";
import { AccountParamList } from "./AccountTypes";
import { AccountMain } from "../AccountMain";
import { EditProfile } from "../EditProfile";
import { Likes } from "../Likes";
import { Friends } from "../FriendsView/Friends";
import { AddFreind } from "../FriendsView/AddFriend";

type AccountNavigatorProps = {};

const Stack = createStackNavigator<AccountParamList>();

const AccountNavigator = (props: AccountNavigatorProps) => {
  return (
    <Stack.Navigator
      initialRouteName="Your Account"
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="Your Account" component={AccountMain} />
      <Stack.Screen name="Edit Profile" component={EditProfile} />
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="Friends" component={Friends} />
      <Stack.Screen name="Add a Friend" component={AddFreind} />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
