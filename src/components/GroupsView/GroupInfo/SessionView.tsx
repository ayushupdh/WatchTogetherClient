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
    let curr = new Date(item.createdAt);
    let months: Record<number, string> = {
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
    };
    let currentDate = {
      hr: curr.getHours(),
      min: curr.getMinutes(),
      month: curr.getMonth(),
      date: curr.getDate(),
    };
    let time = `${
      currentDate.hr > 12 ? currentDate.hr - 12 : currentDate.hr
    }:${("0" + currentDate.min).slice(-2)} ${
      currentDate.hr > 12 ? "PM" : "AM"
    }`;
    let date = `${months[currentDate.month]} ${currentDate.date}`;
    return (
      <Pressable
        onPress={() =>
          nav.navigate("Results", {
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
