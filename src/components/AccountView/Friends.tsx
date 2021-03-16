import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { View, Text } from "react-native";
import { useGetFriends } from "../../hooks/useGetFriends";
import { Center } from "../dumbComponents/Center";
import { CustomButton } from "../dumbComponents/CustomButton";
import { Styles } from "./styles";
import { AccountNavProps } from "./Navigation/AccountTypes";

type FriendsProps = {};
export const Friends = ({ navigation }: AccountNavProps<"Friends">) => {
  const { friends, error } = useGetFriends();
  console.log(friends);

  const renderFriends = () => {
    return friends.map(
      (friend: { _id: string; name: string; username: string }) => {
        return (
          <View key={friend._id} style={Styles.friends}>
            <Ionicons name="person-circle-sharp" size={24} color="black" />

            <Text style={Styles.friendsName}> {friend.name}</Text>
          </View>
        );
      }
    );
  };

  return (
    <View style={Styles.container}>
      <CustomButton
        text="Add Friend"
        style={Styles.addFriendContainer}
        onPressHandler={() => {
          navigation.navigate("Add a Friend");
        }}
      />
      <Text style={Styles.customText}>Friends</Text>
      {friends && renderFriends()}
    </View>
  );
};
