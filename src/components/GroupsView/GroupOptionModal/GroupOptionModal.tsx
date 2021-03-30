import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { removeUserFromGroup } from "../../../utils/userdbUtils";
import { CustomButton } from "../../UtilComponents/CustomButton";
import { GroupsParamList } from "../Navigation/GroupsTypes";
import { styles } from "../styles";

type GroupOptionModalProps = {
  group: {
    name: string;
    id: string;
  };
  nav: StackNavigationProp<GroupsParamList, "Your Groups">;
  close: () => void;
};
export const GroupOptionModal = ({
  group,
  nav,
  close,
}: GroupOptionModalProps) => {
  const userID = useSelector(
    ({ auth }: { auth: { user: { _id: string } } }) => auth.user._id
  );

  const handleRemove = async () => {
    await removeUserFromGroup(group.id, userID);
    close();
  };

  const handleStart = () => {
    close();
    nav.navigate("Create a Group", {
      groupName: group.name,
      groupId: group.id,
    });
  };
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
        onPressHandler={handleStart}
      />

      <CustomButton
        text="Rename Group"
        style={styles.optionModalButton}
        textStyle={{ fontSize: 22, color: "black" }}
      />
      <CustomButton
        text="Leave Group"
        style={{ ...styles.optionModalButton, backgroundColor: "#850000" }}
        textStyle={{ fontSize: 22 }}
        onPressHandler={handleRemove}
      />
    </View>
  );
};
