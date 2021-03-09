import { StackNavigationProp } from "@react-navigation/stack";

export type GroupsParamList = {
  "Your Groups": undefined;
  "Group Session": undefined;
};

export type GroupsNavProps<T extends keyof GroupsParamList> = {
  navigation: StackNavigationProp<GroupsParamList, T>;
};
