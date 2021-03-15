import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { Text, View, StyleSheet, Button, StatusBar } from "react-native";
import { GroupsNavProps } from "./Navigation/GroupsTypes";

import { styles } from "./styles";
import { SwipeCard } from "../SwipeCard/SwipeCard";

export const SwipingView = ({ route }: GroupsNavProps<"SwipingView">) => {
  return (
    <View style={styles.container}>
      {!route.params ? null : (
        <View
          style={{
            paddingHorizontal: 10,
            marginTop: 10,
            backgroundColor: "#F78473",
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="time-outline" size={20} color="white" />
          <Text
            style={{
              fontSize: 20,
              color: "white",
              paddingLeft: 5,
            }}
          >
            5:00
          </Text>
        </View>
      )}

      <SwipeCard />
    </View>
  );
};
