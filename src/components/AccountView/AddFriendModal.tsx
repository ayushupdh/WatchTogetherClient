import React from "react";
import { FontAwesome } from "@expo/vector-icons";

import { Text, View, Image, Alert } from "react-native";
import { CustomButton } from "../dumbComponents/CustomButton";
import { Styles } from "./styles";
import { addFriend } from "../../utils/userdbUtils";

type AddFriendModalProps = {
  user: any;
  handleClose: any;
};
export const AddFriendModal = ({ user, handleClose }: AddFriendModalProps) => {
  const handlePress = async () => {
    await addFriend(user.username);
    Alert.alert(
      "Friend Request Sent!",
      `Your request to user @${user.username} was sent.`,
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
      <View style={Styles.avatarContainer}>
        <FontAwesome
          //   style={Styles.avatar}
          name="user-circle"
          size={100}
          color="black"
        />
        <View style={Styles.avatarNameContainer}>
          <Text style={Styles.avatarText}>{user.name}</Text>
          <Text style={Styles.editprofileButtonText}>@{user.username}</Text>
        </View>
      </View>
      <CustomButton
        style={{
          ...Styles.button,
          backgroundColor: "#F78473",
          alignSelf: "center",
        }}
        onPressHandler={handlePress}
        text="Send a friend Request"
      />
    </View>
  );
};
