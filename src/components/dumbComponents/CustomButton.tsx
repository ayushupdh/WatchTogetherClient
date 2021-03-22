import { Pressable, StyleProp, Text, TextStyle, ViewStyle } from "react-native";
import React from "react";

type CustomButtonProps = {
  text: string;
  onPressHandler?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  textStyle?: StyleProp<TextStyle>;
  pressedColor?: string;
};
export const CustomButton = (props: CustomButtonProps) => {
  return (
    <Pressable
      onPress={props.onPressHandler}
      style={({ pressed }) => [
        props.style,
        pressed && { opacity: 0.9, shadowColor: "#111" },
      ]}
      disabled={props.disabled}
    >
      <Text
        style={[
          {
            alignSelf: "center",
            fontSize: 20,
            color: "#fff",
          },
          props.textStyle,
        ]}
      >
        {props.text}
      </Text>
    </Pressable>
  );
};
