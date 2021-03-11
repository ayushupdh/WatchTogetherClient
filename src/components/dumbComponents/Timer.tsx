import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

type TimerProps = {};
export const Timer = (props: TimerProps) => {
  return (
    <View>
      <Text style={styles.groupTitle}>Select Time </Text>
      <View style={styles.timerContainer}>
        <TextInput
          placeholder="00"
          style={styles.input}
          keyboardType="number-pad"
          maxLength={2}
          defaultValue="00"
        />
        <Text style={styles.groupTitle}>: </Text>
        <TextInput
          placeholder="00"
          style={styles.input}
          defaultValue="00"
          keyboardType="number-pad"
          maxLength={2}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  groupTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 60,
    textAlign: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowOffset: { width: 5, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    marginVertical: 5,
    elevation: 5,
    fontSize: 20,
    color: "black",
    marginHorizontal: 10,
  },
});
