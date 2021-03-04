import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AuthStyles as Styles } from "../styles";

export const KeyboardDismiss = ({ children }: any) => {
  const ViewContainer = Platform.OS === "ios" ? SafeAreaView : View;

  return (
    <ViewContainer style={{ flex: 1 }}>
      <TouchableWithoutFeedback
        // style={Styles.container}
        onPress={() => Keyboard.dismiss()}
      >
        <KeyboardAvoidingView
          style={Styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          enabled
        >
          {children}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ViewContainer>
  );
};
