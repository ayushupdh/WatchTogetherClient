import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../HomeScreen";
import { BottomNavParamList, BottomNavProps } from "./BottomNavTypes";
import { NavigationContainer } from "@react-navigation/native";
import { GroupsMain } from "../GroupsView/GroupsMain";
import { LikesMain } from "../LikesView/LikesMain";
import GroupsNavigator from "../GroupsView/GroupsNavigator";
import HomeViewNavigator from "../HomeView/HomeNavigation";
import AccountNavigator from "../AccountView/AccountNavigator";
const Tab = createBottomTabNavigator<BottomNavParamList>();

// ctrl + cmd + z
const BottomNavTabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="HomeScreen"
        screenOptions={({ route }) => ({
          title: "",

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "HomeScreen") {
              return <Ionicons name={"home"} size={size} color={"#FAA286"} />;
            } else if (route.name === "AccountScreen") {
              return (
                <Ionicons
                  name={"person-circle"}
                  size={size}
                  color={"#03F9EA"}
                />
              );
            } else if (route.name === "GroupsScreen") {
              return <Ionicons name={"people"} size={size} color={"green"} />;
            } else if (route.name === "LikesScreen") {
              return <Ionicons name={"heart"} size={size} color={"red"} />;
            }

            // You can return any component that you like here!
          },
        })}
      >
        <Tab.Screen name="LikesScreen" component={LikesMain} />
        <Tab.Screen name="GroupsScreen" component={GroupsNavigator} />
        <Tab.Screen name="HomeScreen" component={HomeViewNavigator} />
        <Tab.Screen name="AccountScreen" component={AccountNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default BottomNavTabs;
