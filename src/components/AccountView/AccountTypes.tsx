import { StackNavigationProp } from "@react-navigation/stack";

export type AccountParamList = {
  "Your Account": undefined;
  "Edit Profile": undefined;
  Likes: undefined;
  Friends: undefined;
};

export type AccountNavProps<T extends keyof AccountParamList> = {
  navigation: StackNavigationProp<AccountParamList, T>;
};
