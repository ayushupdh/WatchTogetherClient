import { StackNavigationProp } from "@react-navigation/stack";

export type GroupsParamList = {
  "Your Groups": undefined;
  "Group Session": undefined;
  "Add a Friend": undefined;
  SelectGenres: undefined;
  SwipingView: undefined;
};
export type GroupsDataType = {
  name: string;
  genres: string[];
  languages: string[];
  time: string;
};

export type GroupsNavProps<T extends keyof GroupsParamList> = {
  navigation: StackNavigationProp<GroupsParamList, T>;
};
