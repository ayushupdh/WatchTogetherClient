import { StackNavigationProp } from "@react-navigation/stack";
import { GroupsParamList } from "../../GroupsView/Navigation/GroupsTypes";

export type HomeViewParamList = {
  "Watch Together": undefined;
  "Select options": undefined;
} & GroupsParamList;

export type HomeViewNavProps<T extends keyof HomeViewParamList> = {
  navigation: StackNavigationProp<HomeViewParamList, T>;
};
