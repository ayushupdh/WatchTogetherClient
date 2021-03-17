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
  const { friends, error } = useGetFriends(Math.random().toString());

  const renderFriends = () => {
    if (friends && friends.length !== 0) {
      return (
        <>
          <CustomButton
            text="Add Friend"
            style={Styles.addFriendContainer}
            onPressHandler={() => {
              navigation.navigate("Add a Friend");
            }}
          />
          <Text style={Styles.customText}>Friends</Text>
          {friends.map(
            (friend: { _id: string; name: string; username: string }) => {
              return (
                <>
                  <View key={friend._id} style={Styles.friends}>
                    <Ionicons
                      name="person-circle-sharp"
                      size={24}
                      color="black"
                    />

                    <Text style={Styles.friendsName}> {friend.name}</Text>
                  </View>
                </>
              );
            }
          )}
        </>
      );
    } else {
      return (
        <View
          style={{
            ...Styles.buttonsContainer,
            marginVertical: 30,
            justifyContent: "center",
          }}
        >
          <Text style={Styles.customText}>You don't have any friends yet!</Text>
          <Text style={{ ...Styles.customText, marginTop: 0 }}>
            Let's get started!
          </Text>
          <CustomButton
            text="Add a Friend"
            style={{
              ...Styles.addFriendContainer,
              alignSelf: "center",
              width: "80%",
            }}
            onPressHandler={() => {
              navigation.navigate("Add a Friend");
            }}
          />
        </View>
      );
    }
  };

  return <View style={Styles.container}>{friends && renderFriends()}</View>;
};
