import { FontAwesome as Icon } from "@expo/vector-icons";
import React, { ForwardedRef, RefObject, useRef, useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AuthStyles as Styles } from "../styles";

type PasswordBoxProps = {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
  children?: React.ReactNode;
  blurOnSubmit: boolean;
};
export const PasswordBox = React.forwardRef(
  (
    { children, ...otherProps }: PasswordBoxProps,
    ref: ForwardedRef<TextInput>
  ) => {
    const [hidePassword, togglePassword] = useState<boolean>(true);

    return (
      <View style={{ flexDirection: "row" }}>
        <TextInput
          ref={ref}
          {...otherProps}
          style={Styles.passwordBox}
          returnKeyType="done"
          textContentType="password"
          secureTextEntry={hidePassword}
        />
        <View style={Styles.iconContainer}>
          <Icon
            style={{ alignSelf: "center" }}
            backgroundColor="red"
            name={hidePassword ? "eye-slash" : "eye"}
            size={15}
            color="black"
            onPress={() => togglePassword(!hidePassword)}
          />
        </View>
      </View>
    );
  }
);
