import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { joinSessionPopulate } from "../../../redux/actions/sessionAction";
import {
  getSessionInfo,
  removeUserFromGroup,
} from "../../../utils/userdbUtils";
import { emitter } from "../../io/io.emit";
import { CustomButton } from "../../UtilComponents/CustomButton";
import { GroupsParamList } from "../Navigation/GroupsTypes";
import { styles } from "../styles";

type GroupOptionModalProps = {
  group: {
    name: string;
    _id: string;
    session_active: boolean;
    current_session?: string;
  };
  nav: StackNavigationProp<GroupsParamList, "Your Groups">;
  close: () => void;
  handleRename: (groupName: string, groupID: string) => void;
};
export const GroupOptionModal = ({
  group,
  nav,
  close,
  handleRename,
}: GroupOptionModalProps) => {
  const userID = useSelector(
    ({ auth }: { auth: { user: { _id: string } } }) => auth.user._id
  );
  const dispatch = useDispatch();
  const handleRemove = async () => {
    await removeUserFromGroup(group._id, userID);
    if (group.current_session) {
      emitter.friendRemovedFromGroup(group.current_session);
    }
    close();
  };
  const handleStart = async () => {
    if (group.current_session) {
      const { response, error } = await getSessionInfo(group.current_session);
      joinSessionPopulate(
        {
          groupID: response.groupID,
          sessionID: response._id,
          swipingActive: response.swiping_active,
        },
        dispatch
      );
    }
    close();
    nav.navigate("Create a Group", {
      groupName: group.name,
      groupId: group._id,
      sessionID: group.current_session ? group.current_session : null,
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
        text={group.session_active ? "Join the session" : "Start new session"}
        style={styles.optionModalButton}
        textStyle={{ fontSize: 22, color: "black" }}
        onPressHandler={handleStart}
      />
      <CustomButton
        text="Rename Group"
        onPressHandler={() => handleRename(group.name, group._id)}
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
