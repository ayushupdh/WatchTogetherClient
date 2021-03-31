import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

import {
  View,
  Image,
  Pressable,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import { useGroupsInfo } from "../../hooks/useGroupsInfo";
import { GroupsNavProps } from "./Navigation/GroupsTypes";
import { UserViewModal } from "../UserViewModal/FriendViewModal";
import { Modalize } from "react-native-modalize";
import { UserAvatar } from "../UserViewModal/UserAvatar";

export const GroupInfo = ({
  navigation,
  route,
}: GroupsNavProps<"GroupInfo">) => {
  const [sessionsSelected, setsessionsSelected] = useState(false);
  const [selectedUser, setUser] = useState("");

  const groupId = route.params.groupId;

  const { groupInfo, error } = useGroupsInfo(groupId);
  useLayoutEffect(() => {
    if (groupInfo) {
      navigation.setOptions({ title: groupInfo.name });
    }
  }, [groupInfo]);

  const modalRef = useRef<Modalize>();

  const showModal = (id: string) => {
    setUser(id);
    modalRef.current?.open();
  };
  const handleClose = () => {
    modalRef.current?.close();
  };

  const renderMembers = ({ item }: any) => (
    <Pressable style={styles.friends} onPress={() => showModal(item._id)}>
      <UserAvatar avatar={item.avatar} size={40} borderRadius={20} />
      <Text style={styles.friendsName}>{item.name}</Text>
    </Pressable>
  );
  const FriendsView = () => {
    return (
      <View style={styles.friendsListContainer}>
        {groupInfo ? (
          <FlatList
            data={groupInfo.users}
            renderItem={renderMembers}
            keyExtractor={(item) => item._id}
          />
        ) : (
          <Text>No users in this group</Text>
        )}
      </View>
    );
  };

  if (groupInfo) {
    return (
      <View style={styles.container}>
        <View style={styles.groupInfoContainer}>
          <Text
            style={{ fontSize: 32, fontWeight: "bold", paddingHorizontal: 20 }}
          >
            {groupInfo ? groupInfo.name : "Loading.."}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              paddingTop: 10,
              paddingHorizontal: 20,
            }}
          >
            Started By:{" "}
            {groupInfo && groupInfo.created_by
              ? groupInfo.created_by.name
              : "Loading.."}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              paddingVertical: 5,
              paddingHorizontal: 20,
            }}
          >
            Members:{" "}
            {groupInfo && groupInfo.users
              ? groupInfo.users.length
              : "Loading.."}
          </Text>
        </View>
        <View style={styles.groupsSelectorContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.groupsSelectorText,
              {
                backgroundColor: sessionsSelected ? "white" : "#313B68",
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            onPress={() => setsessionsSelected(false)}
          >
            <Text
              style={{
                fontSize: 32,
                color: sessionsSelected ? "black" : "white",
              }}
            >
              Members
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.groupsSelectorText,
              {
                backgroundColor: !sessionsSelected ? "white" : "#313B68",
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            onPress={() => setsessionsSelected(true)}
          >
            <Text
              style={{
                fontSize: 32,
                color: !sessionsSelected ? "black" : "white",
              }}
            >
              Sessions
            </Text>
          </Pressable>
        </View>
        {sessionsSelected ? null : <FriendsView />}
        <UserViewModal
          modalRef={modalRef}
          userID={selectedUser}
          closeModal={handleClose}
        />
      </View>
    );
  } else {
    return <ActivityIndicator style={{ flex: 1 }} size={"large"} />;
  }
};
