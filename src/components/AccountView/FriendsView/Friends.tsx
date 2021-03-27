import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { View, Image, Text, FlatList, TextInput } from "react-native";
import { useGetFriends } from "../../../hooks/useGetFriends";
import { Center } from "../../UtilComponents/Center";
import { CustomButton } from "../../UtilComponents/CustomButton";
import { Styles } from "../styles";
import { AccountNavProps } from "../Navigation/AccountTypes";

type FriendsType = {
  _id: string;
  name: string;
  username: string;
  avatar: string;
};
export const Friends = ({ navigation }: AccountNavProps<"Friends">) => {
  const {
    friends,
    error,
  }: {
    friends: readonly FriendsType[] | null;
    error: string | null;
  } = useGetFriends();
  const renderItem = ({ item }: { item: FriendsType }) => {
    return (
      <View key={item._id} style={Styles.friends}>
        {item.avatar && item.avatar !== "" ? (
          <Image
            source={{ uri: item.avatar }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        ) : (
          <Ionicons name="person-circle-sharp" size={40} color="black" />
        )}
        <Text style={Styles.friendsName}> {item.name}</Text>
      </View>
    );
  };

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
          <TextInput editable={false} style={Styles.customText}>
            Friends
          </TextInput>
          <FlatList
            contentContainerStyle={{ paddingVertical: 20 }}
            renderItem={renderItem}
            data={friends}
            keyExtractor={(item: FriendsType) => item._id}
          />
          {/* {friends.map(
            (friend: { _id: string; name: string; username: string }) => {
              
            }
          )} */}
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
