import { FontAwesome as Icon } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type PasswordBoxProps = {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
};

export const PasswordBox = ({
  placeholder,
  onChangeText,
  value,
}: PasswordBoxProps) => {
  const [hidePassword, togglePassword] = useState<boolean>(true);
  //   const passwordRef: any = useRef<TextInput>();
  //   if (focus) {
  //     passwordRef.current.focus();
  //     changeFocus();
  //   }

  return (
    <View
      style={{
        // flex: 1,
        flexDirection: "row",
        // marginTop: 15,
        // marginBottom: 20,
      }}
    >
      <TextInput
        // ref={passwordRef}
        placeholder={placeholder}
        style={{
          flex: 1,
          padding: 15,
          borderRadius: 50,
          backgroundColor: "#fff",
          color: "#000",
          shadowOffset: { width: 5, height: 4 },
          shadowColor: "#000",
          shadowOpacity: 0.4,
          borderTopEndRadius: 0,
          borderBottomEndRadius: 0,
        }}
        onChangeText={onChangeText}
        value={value}
        returnKeyType="done"
        textContentType="password"
        secureTextEntry={hidePassword}
      />
      <View
        style={{
          padding: 15,
          backgroundColor: "#fff",
          shadowOffset: { width: 4.5, height: 4 },
          shadowColor: "#000",
          shadowOpacity: 0.4,
          borderBottomEndRadius: 30,
          borderTopEndRadius: 30,
        }}
      >
        <Icon
          style={{
            alignSelf: "center",
          }}
          backgroundColor="red"
          name={hidePassword ? "eye-slash" : "eye"}
          size={15}
          color="black"
          onPress={() => togglePassword(!hidePassword)}
        />
      </View>
    </View>
  );
};
