import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type GroupsParamList = {
  "Your Groups": undefined;
  "Create a Group":
    | {
        groupName: string | undefined;
        groupId: string | undefined;
      }
    | undefined;
  "Add a Friend": {
    groupName: string;
  };

  SwipingView: {
    groupName: string | undefined;
  };
  GroupInfo: {
    groupId: string;
  };
  "Select Options": {
    groupId: string | undefined;
    groupName: string | undefined;
  };
};

export type GroupsDataType = {
  genres: string[];
  languages: string[];
  time: string;
  providers: string[];
};

export type GroupsNavProps<T extends keyof GroupsParamList> = {
  navigation: StackNavigationProp<GroupsParamList, T>;
  route: RouteProp<GroupsParamList, T>;
};
