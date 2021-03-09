import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";
import { AccountParamList } from "./AccountTypes";
import { AccountMain } from "./AccountMain";

type AccountNavigatorProps = {};

const Stack = createStackNavigator<AccountParamList>();

const AccountNavigator = (props: AccountNavigatorProps) => {
  return (
    <Stack.Navigator initialRouteName="Your Account">
      <Stack.Screen name="Your Account" component={AccountMain} />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
