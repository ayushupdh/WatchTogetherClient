import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type GroupsParamList = {
  "Your Groups": undefined;
  "Create a Group":
    | {
        groupName: string;
        groupId: string;
      }
    | undefined;
  "Add a Friend":
    | {
        groupName: string;
      }
    | undefined;

  SwipingView: {
    groupName: string;
  };
  GroupInfo: {
    groupId: string;
  };
  "Select Options": {
    groupId: string;
    groupName: string;
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
