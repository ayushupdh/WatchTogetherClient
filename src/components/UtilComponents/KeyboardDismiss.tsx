import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export const KeyboardDismiss = ({ children }: any) => {
  const ViewContainer = Platform.OS === "ios" ? SafeAreaView : View;
  return (
    <ViewContainer style={styles.main}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
          enabled
        >
          {children}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: "#E2EAF4" },
  container: {
    flex: 1,
    backgroundColor: "#E2EAF4",
    alignItems: "center",
    // paddingBottom: 100,
  },
});
