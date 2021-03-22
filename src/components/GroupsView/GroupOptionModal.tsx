import React from "react";
import { View, Text } from "react-native";
import { CustomButton } from "../dumbComponents/CustomButton";
import { styles } from "./styles";

type GroupOptionModalProps = {};
export const GroupOptionModal = (props: GroupOptionModalProps) => {
  return (
    <View style={{ padding: 10, backgroundColor: "#E2EAF4" }}>
      <CustomButton
        text="Show Group"
        style={styles.optionModalButton}
        textStyle={{ fontSize: 22, color: "black" }}
      />
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
