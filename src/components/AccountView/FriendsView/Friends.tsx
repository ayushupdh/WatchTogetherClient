import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import {
  View,
  Image,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useGetFriends } from "../../../hooks/useGetFriends";
import { CustomButton } from "../../UtilComponents/CustomButton";
import { Styles } from "../styles";
import { AccountNavProps } from "../Navigation/AccountTypes";
import { Modalize } from "react-native-modalize";
import { UserViewModal } from "../../UserViewModal/FriendViewModal";
import { UserAvatar } from "../../UserViewModal/UserAvatar";

type FriendsType = {
  _id: string;
  name: string;
  username: string;
  avatar: string;
};
export const Friends = ({ navigation }: AccountNavProps<"Friends">) => {
  const {
    friends,
    loading,
    error,
  }: {
    friends: readonly FriendsType[] | null;
    loading: boolean;
    error: string | null;
  } = useGetFriends();
  const [selectedUser, setUser] = useState("");

  const modalRef = useRef<Modalize>();
  const openModal = (id: string) => {
    setUser(id);
    modalRef.current?.open();
  };
  const closeModal = () => {
    modalRef.current?.close();
  };

  const renderFriends = ({ item }: { item: FriendsType }) => {
    return (
      <Pressable
        key={item._id}
        style={Styles.friends}
        onPress={() => openModal(item._id)}
      >
        <UserAvatar
          avatar={item.avatar}
          size={35}
          borderRadius={30}
          border={false}
        />
        <Text style={Styles.friendsName}> {item.name}</Text>
      </Pressable>
    );
  };

  const renderFriendsComponent = () => {
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
            renderItem={renderFriends}
            data={friends}
            keyExtractor={(item: FriendsType) => item._id}
          />
          <UserViewModal
            modalRef={modalRef}
            userID={selectedUser}
            closeModal={closeModal}
          />
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
  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  } else {
    return (
      <View style={Styles.container}>
        {friends && renderFriendsComponent()}
      </View>
    );
  }
};
