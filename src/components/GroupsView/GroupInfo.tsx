import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

import { View, Text, FlatList } from "react-native";
import { styles } from "./styles";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useGroupsInfo } from "../../hooks/useGroupsInfo";
import { GroupsNavProps } from "./Navigation/GroupsTypes";

export const GroupInfo = ({ navigation }: GroupsNavProps<"GroupInfo">) => {
  const [sessionsSelected, setsessionsSelected] = useState(false);
  // TODO Change here
  const { groupInfo, error } = useGroupsInfo("604f06bcf3619df0376ba89d");

  useLayoutEffect(() => {
    if (groupInfo) {
      navigation.setOptions({ title: groupInfo.name });
    }
  }, [groupInfo]);

  const renderItem = ({ item }: any) => (
    <View style={styles.friends}>
      <Ionicons name="person-circle-sharp" size={24} color="black" />
      <Text style={styles.friendsName}>{item.name}</Text>
      <SimpleLineIcons name="options-vertical" size={24} color="#555" />
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
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          By: {groupInfo ? groupInfo.created_by : "Loading.."}
        </Text>
      </View>
      <View style={styles.groupsSelectorContainer}>
        <TouchableHighlight
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
};