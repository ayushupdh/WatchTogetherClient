import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { string } from "prop-types";

type OverlayProps = {
  label: string;
  color: string;
};

export const OverlayLabel = ({ label, color }: OverlayProps) => (
  <View style={[styles.overlayLabel, { backgroundColor: color }]}>
    <Text style={styles.overlayLabelText}>{label}</Text>
  </View>
);
const styles = StyleSheet.create({
  overlayLabel: {
    padding: 8,
    borderRadius: 15,
  },

  overlayLabelText: {
    fontSize: 25,
    textAlign: "center",
    color: "white",
  },
});
