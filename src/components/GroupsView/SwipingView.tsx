import React, { useEffect, useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import { Text, View, StyleSheet, Button, StatusBar, Alert } from "react-native";
import { GroupsNavProps } from "./Navigation/GroupsTypes";

import { styles } from "./styles";
import { SwipeCard } from "../SwipeCard/SwipeCard";
import { useDispatch } from "react-redux";
import { END_SESSION } from "../../redux/types/SessionTypes";

export const SwipingView = ({
  route,
  navigation,
}: GroupsNavProps<"SwipingView">) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
      headerRight: () => (
        <Text
          onPress={() => navigation.goBack()}
          style={{
            color: "blue",
            alignSelf: "center",
            fontSize: 18,
            fontWeight: "500",
            paddingRight: 10,
          }}
        >
          Done
        </Text>
      ),
    });
  }, [navigation]);
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      // Prevent default behavior of leaving the screen
      e.preventDefault();
      // Prompt the user before leaving the screen
      Alert.alert("Do you wanna exit?", "This will end the session", [
        { text: "Don't leave", style: "cancel", onPress: () => {} },
        {
          text: "Exit",
          style: "destructive",
          // If the user confirmed, then we dispatch the action we blocked earlier
          // This will continue the action that had triggered the removal of the screen
          onPress: () => {
            navigation.dispatch(e.data.action);
            navigation.popToTop();
            dispatch({
              type: END_SESSION,
            });
          },
        },
      ]);
    });
    return () => {
      navigation.removeListener("beforeRemove", () => {});
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      {route.params.groupName === "Single Session" ? null : (
        <View
          style={{
            paddingHorizontal: 10,
            marginTop: 10,
            backgroundColor: "#37BEB0",
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* <Ionicons name="time-outline" size={20} color="white" /> */}
          {/* <Text
            style={{
              fontSize: 20,
              color: "white",
              paddingLeft: 5,
            }}
          >
            5:00
          </Text> */}
        </View>
      )}

      <SwipeCard />
    </View>
  );
};
