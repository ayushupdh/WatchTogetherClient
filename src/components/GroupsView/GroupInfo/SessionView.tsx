import React from "react";
import { View, Image, FlatList, Text, Pressable } from "react-native";
import { Loading } from "../../UtilComponents/Loading";
import { styles } from "../styles";
import { useGetGroupsSession } from "../../../hooks/useGetGroupsSession";
import { StackNavigationProp } from "@react-navigation/stack";
import { GroupsParamList } from "../Navigation/GroupsTypes";
type SessionViewProps = {
  groupID: string;
  nav: StackNavigationProp<GroupsParamList, "GroupInfo">;
};
export const SessionView = ({ nav, groupID }: SessionViewProps) => {
  const { sessionList, loading, error } = useGetGroupsSession(groupID);

  const renderSessions = ({ item }: { item: any }) => {
    let dateObj = new Date(item.createdAt);
    let timeObj = dateObj.toLocaleTimeString().split(" ");
    let dateArr = dateObj.toDateString().split(" ");
    let time = `${timeObj[0].split(":")[0]}:${timeObj[0].split(":")[1]} ${
      timeObj[1]
    }`;
    let date = `${dateArr[1]} ${dateArr[2]}`;
    return (
      <Pressable
        onPress={() =>
          nav.navigate("ResultsView", {
            sessionID: item._id,
            sessionView: true,
          })
        }
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          width: "90%",
          alignSelf: "center",
          padding: 20,
          borderRadius: 10,
          shadowOffset: { width: 5, height: 4 },
          shadowColor: "#000",
          shadowOpacity: 0.4,
          marginVertical: 5,
          elevation: 5,
        }}
      >
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Text style={{ fontSize: 18 }}>On {time}</Text>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>{" " + date}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.friendsListContainer}>
      {loading ? (
        <Loading />
      ) : sessionList && sessionList.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={sessionList}
          renderItem={renderSessions}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <Text>No users in this group</Text>
      )}
    </View>
  );
};
