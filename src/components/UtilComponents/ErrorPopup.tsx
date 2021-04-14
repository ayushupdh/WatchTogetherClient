import React from "react";
import { View, Text } from "react-native";

type ErrorPopupProps = {
  error: string;
};
export const ErrorPopup = (props: ErrorPopupProps) => {
  return (
    <View
      style={{
        padding: 10,
        position: "absolute",
        bottom: 20,
        backgroundColor: "black",
        borderRadius: 20,
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <Text style={{ color: "white" }}> {props.error}</Text>
    </View>
  );
};
