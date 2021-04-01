import React from "react";
import { FontAwesome } from "@expo/vector-icons";

import { Text, View, Image, Alert, StyleSheet } from "react-native";
import { CustomButton } from "../UtilComponents/CustomButton";
import { Styles } from "../AccountView/styles";
import { addFriend } from "../../utils/userdbUtils";
import { UserAvatar } from "./UserAvatar";

type AddFriendModalProps = {
  user: any;
  handleClose: any;
};
export const AddFriendModal = ({ user, handleClose }: AddFriendModalProps) => {
  const handlePress = async () => {
    await addFriend(user.username);
    Alert.alert(
      "Friend has been added!",
      `Your request to add user @${user.username} was successfull.`,
      [
        {
          text: "OK",
          style: "cancel",
          onPress: () => {
            handleClose();
          },
        },
      ]
    );
  };

  return (
    <View>
      <View style={styles.avatarContainer}>
        <UserAvatar avatar={user.avatar} />
        <View style={styles.avatarNameContainer}>
          <Text style={styles.avatarText}>{user.name}</Text>
          <Text style={styles.editprofileButtonText}>@{user.username}</Text>
        </View>
      </View>
      <CustomButton
        style={styles.button}
        onPressHandler={handlePress}
        text="Add to your friend list"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  avatarNameContainer: {
    flexGrow: 1,
    alignSelf: "flex-start",
    paddingLeft: 20,
    paddingTop: 20,
    flexShrink: 1,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  editprofileButton: {
    backgroundColor: "#f6f6f6",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 30,
    marginTop: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
  },
  editprofileButtonText: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  button: {
    width: "80%",
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    backgroundColor: "#37BEB0",
    alignSelf: "center",
  },
});
