import React from "react";
import { Platform, View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStyles } from "../styles";

export const Center = ({ children }: any) => {
  const ViewContainer = Platform.OS === "ios" ? SafeAreaView : View;
  return <ViewContainer style={AuthStyles.container}>{children}</ViewContainer>;
};
