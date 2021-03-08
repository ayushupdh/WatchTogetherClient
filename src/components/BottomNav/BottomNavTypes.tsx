import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type BottomNavParamList = {
  HomeScreen: undefined;
  AccountScreen: undefined;
  LikesScreen: undefined;
  GroupsScreen: undefined;
};

export type BottomNavProps<T extends keyof BottomNavParamList> = {
  navigation: BottomTabNavigationProp<BottomNavParamList, T>;
};
