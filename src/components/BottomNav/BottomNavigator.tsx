import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { BottomNavParamList, BottomNavProps } from "./BottomNavTypes";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
  RouteProp,
} from "@react-navigation/native";
import { GroupsMain } from "../GroupsView/GroupsMain";
import { NotificationMain } from "../NotificationView/NotificationMain";
import GroupsNavigator from "../GroupsView/Navigation/GroupsNavigator";
import HomeViewNavigator from "../HomeView/Navigation/HomeNavigation";
import AccountNavigator from "../AccountView/Navigation/AccountNavigator";
import { View } from "react-native";
const Tab = createBottomTabNavigator<BottomNavParamList>();

// Check for routes to show the bottom nav
const BottomNavTabs = () => {
  const getTabBarVisibility = (route: RouteProp<any, any>) => {
    const state = getFocusedRouteNameFromRoute(route);
    if (
      state === "SwipingView" ||
      state === "Add a Friend" ||
      state === "Create a Group" ||
      state === "Results"
    ) {
      return false;
    }

    return true;
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="HomeScreen"
        screenOptions={({ route }) => ({
          title: "",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "HomeScreen") {
              return <Icon name="home" color="#313B68" focused={focused} />;
            } else if (route.name === "AccountScreen") {
              return (
                <Icon name="person-circle" color="red" focused={focused} />
              );
            } else if (route.name === "GroupsScreen") {
              return <Icon name="people" color="green" focused={focused} />;
            }
          },
        })}
      >
        {/* <Tab.Screen name="LikesScreen" component={NotificationMain} /> */}
        <Tab.Screen
          name="GroupsScreen"
          component={GroupsNavigator}
          options={({ route }) => ({
            tabBarVisible: getTabBarVisibility(route),
          })}
        />
        <Tab.Screen
          name="HomeScreen"
          component={HomeViewNavigator}
          options={({ route }) => ({
            tabBarVisible: getTabBarVisibility(route),
          })}
        />
        <Tab.Screen name="AccountScreen" component={AccountNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
type IconProps = {
  focused: boolean;
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
};
// Custom Icon component
const Icon = ({ focused, name, color }: IconProps) => {
  return (
    <Ionicons
      name={`${name}${focused ? "" : "-outline"}`}
      size={30}
      color={color}
    />
  );
};
export default BottomNavTabs;
