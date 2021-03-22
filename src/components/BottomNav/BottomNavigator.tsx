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
const Tab = createBottomTabNavigator<BottomNavParamList>();

// ctrl + cmd + z
const BottomNavTabs = () => {
  const getTabBarVisibility = (route: RouteProp<any, any>) => {
    const state = getFocusedRouteNameFromRoute(route);
    // const routeName = route.state
    //   ? route.state.routes[route.state.index].name
    //   : "";

    if (state === "SwipingView") {
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
              return <Ionicons name={"home"} size={size} color={"#313B68"} />;
            } else if (route.name === "AccountScreen") {
              return (
                <Ionicons name={"person-circle"} size={30} color={"red"} />
              );
            } else if (route.name === "GroupsScreen") {
              return <Ionicons name={"people"} size={size} color={"green"} />;
            } else if (route.name === "LikesScreen") {
              return (
                <Ionicons
                  name={"notifications"}
                  size={size}
                  color={"#FAA286"}
                />
              );
            }

            // You can return any component that you like here!
          },
        })}
      >
        <Tab.Screen name="LikesScreen" component={NotificationMain} />
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
export default BottomNavTabs;
