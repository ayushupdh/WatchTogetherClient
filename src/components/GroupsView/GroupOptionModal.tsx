import React from "react";
import { View, Text } from "react-native";
import { CustomButton } from "../UtilComponents/CustomButton";
import { styles } from "./styles";

type GroupOptionModalProps = {};
export const GroupOptionModal = (props: GroupOptionModalProps) => {
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: "#E2EAF4",
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
      }}
    >
      <CustomButton
        text="Start new session"
        style={styles.optionModalButton}
        textStyle={{ fontSize: 22, color: "black" }}
      />
      <CustomButton
        text="Leave Group"
        style={styles.optionModalButton}
        textStyle={{ fontSize: 22, color: "black" }}
      />

      <CustomButton
        text="Rename Group"
        style={styles.optionModalButton}
        textStyle={{ fontSize: 22, color: "black" }}
      />
    </View>
  );
};
