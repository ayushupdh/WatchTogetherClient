import React from "react";
import { ActivityIndicator, View, Text } from "react-native";

type LoadingProps = {
  size?: "large" | "small";
};
export const Loading = (props: LoadingProps) => {
  return (
    <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
      <ActivityIndicator
        style={{ flex: 1 }}
        size={props.size ? props.size : "large"}
      />
      <Text style={{ flex: 1, color: "#313B68", fontSize: 20 }}>LOADING</Text>
    </View>
  );
};
