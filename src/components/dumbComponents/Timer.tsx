import React, { SetStateAction } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

type TimerCompProps = {
  time: { min: string; sec: string };
  setTime: React.Dispatch<SetStateAction<{ min: string; sec: string }>>;
};

export const Timer = (props: TimerCompProps) => {
  return (
    <View>
      <Text style={styles.groupTitle}>Select Time </Text>
      <View style={styles.timerContainer}>
        <TextInput
          placeholder="00"
          style={styles.input}
          keyboardType="number-pad"
          maxLength={2}
          value={props.time.min}
          onChangeText={(val) => props.setTime({ ...props.time, min: val })}
          onFocus={() => {
            props.time.min == "00" || props.time.min == "0"
              ? props.setTime({ ...props.time, min: "" })
              : null;
          }}
          onBlur={() => {
            props.time.min == "" || props.time.min == "0"
              ? props.setTime({ ...props.time, min: "00" })
              : null;
          }}
        />
        <Text style={styles.colonSeparator}>: </Text>
        <TextInput
          placeholder="00"
          style={styles.input}
          keyboardType="number-pad"
          maxLength={2}
          value={props.time.sec}
          onChangeText={(val) => props.setTime({ ...props.time, sec: val })}
          onFocus={() => {
            props.time.sec == "00" || props.time.sec == "0"
              ? props.setTime({ ...props.time, sec: "" })
              : null;
          }}
          onBlur={() => {
            props.time.sec == "" || props.time.sec == "0"
              ? props.setTime({ ...props.time, sec: "00" })
              : null;
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  groupTitle: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    // paddingBottom: 5,
    marginTop: 10,
    alignSelf: "center",
  },
  colonSeparator: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 5,
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
  },
});
