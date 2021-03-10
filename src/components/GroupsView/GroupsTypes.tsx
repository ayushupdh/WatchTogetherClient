import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type GroupsParamList = {
  "Your Groups": undefined;
  "Group Session": undefined;
  "Add a Friend": {
    groupName: string;
  };
  SelectGenres: {
    groupName: string;
  };
  SwipingView: {
    groupName: string;
  };
};
export type GroupsDataType = {
  name: string;
  genres: string[];
  languages: string[];
  time: string;
};

export type GroupsNavProps<T extends keyof GroupsParamList> = {
  navigation: StackNavigationProp<GroupsParamList, T>;
  route: RouteProp<GroupsParamList, T>;
};
