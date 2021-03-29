import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

import { View, Image, Text, FlatList, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useGroupsInfo } from "../../hooks/useGroupsInfo";
import { GroupsNavProps } from "./Navigation/GroupsTypes";

export const GroupInfo = ({
  navigation,
  route,
}: GroupsNavProps<"GroupInfo">) => {
  const [sessionsSelected, setsessionsSelected] = useState(false);
  // TODO Change here
  const groupId = route.params.groupId;
  const { groupInfo, error } = useGroupsInfo(groupId);
  useLayoutEffect(() => {
    if (groupInfo) {
      navigation.setOptions({ title: groupInfo.name });
    }
  }, [groupInfo]);

  const renderItem = ({ item }: any) => (
    <View style={styles.friends}>
      {item.avatar && item.avatar !== "" ? (
        <Image
          source={{ uri: item.avatar }}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
      ) : (
        <Ionicons name="person-circle-sharp" size={30} color="black" />
      )}
      <Text style={styles.friendsName}>{item.name}</Text>
      {/* <SimpleLineIcons name="options-vertical" size={20} /> */}
    </View>
  );
  const FriendsView = () => {
    return (
      <View style={styles.friendsListContainer}>
        {groupInfo ? (
          <FlatList
            data={groupInfo.users}
            renderItem={renderItem}
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
            style={{ fontSize: 42, fontWeight: "bold", paddingHorizontal: 10 }}
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
          <TouchableHighlight
            underlayColor="none"
            style={[
              styles.groupsSelectorText,
              { backgroundColor: sessionsSelected ? "white" : "#313B68" },
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
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="none"
            style={[
              styles.groupsSelectorText,
              { backgroundColor: !sessionsSelected ? "white" : "#313B68" },
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
          </TouchableHighlight>
        </View>
        {sessionsSelected ? null : <FriendsView />}
      </View>
    );
  } else {
    return <ActivityIndicator style={{ flex: 1 }} size={"large"} />;
  }
};
