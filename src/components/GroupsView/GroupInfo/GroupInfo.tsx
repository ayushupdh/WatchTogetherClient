import React, { useLayoutEffect, useRef, useState } from "react";
import { View, Pressable, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../styles";
import { useGroupsInfo } from "../../../hooks/useGroupsInfo";
import { GroupsNavProps } from "../Navigation/GroupsTypes";
import { UserViewModal } from "../../UserViewModal/FriendViewModal";
import { Modalize } from "react-native-modalize";
import { Loading } from "../../UtilComponents/Loading";
import { FriendsView } from "./FriendsView";
import { SessionView } from "./SessionView";

export const GroupInfo = ({
  navigation,
  route,
}: GroupsNavProps<"GroupInfo">) => {
  const [sessionsSelected, setsessionsSelected] = useState(false);
  const [selectedUser, setUser] = useState("");

  const groupId = route.params.groupId;

  const { groupInfo, groupsLoading, error } = useGroupsInfo(groupId);
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

  if (!groupsLoading) {
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
            Created By:{" "}
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
        {sessionsSelected ? (
          <SessionView nav={navigation} groupID={groupInfo._id} />
        ) : (
          <FriendsView
            groupsLoading={groupsLoading}
            groupInfo={groupInfo}
            showModal={showModal}
          />
        )}
        <UserViewModal
          modalRef={modalRef}
          userID={selectedUser}
          closeModal={handleClose}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.groupInfoContainer}>
          <View
            style={{
              backgroundColor: "#ccc",
              paddingVertical: 10,
              width: "50%",
              borderRadius: 20,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              marginVertical: 5,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              Created By By:{" "}
            </Text>
            <View
              style={{
                backgroundColor: "#ccc",
                width: "50%",
                height: "50%",
                borderRadius: 20,
                alignSelf: "center",
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 5,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              Members:{" "}
            </Text>
            <View
              style={{
                backgroundColor: "#ccc",
                width: "50%",
                height: "50%",
                borderRadius: 20,
                alignSelf: "center",
              }}
            />
          </View>
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
        {<Loading />}
      </View>
    );
  }
};
