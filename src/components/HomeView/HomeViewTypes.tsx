import { StackNavigationProp } from "@react-navigation/stack";

export type HomeViewParamList = {
  "Watch Together": undefined;
};

export type HomeViewNavProps<T extends keyof HomeViewParamList> = {
  navigation: StackNavigationProp<HomeViewParamList, T>;
};
