import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Center } from "../dumbComponents/Center";
import { useGetGroups } from "../../hooks/useGetGroups";
import { styles } from "./styles";
import { SimpleLineIcons } from "@expo/vector-icons";
import { CustomButton } from "../dumbComponents/CustomButton";
import { GroupsNavProps } from "./Navigation/GroupsTypes";

type GetGroupsType = {
  groups: {
    name: string;
    id: string;
  };
  error: string | null;
};

export const GroupsMain = ({ navigation }: GroupsNavProps<"Your Groups">) => {
  const { groups, error }: GetGroupsType = useGetGroups();

  const renderItem = ({ item }: any) => {
    const randomColor: string =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
    return (
      <View style={styles.item}>
        <View style={[styles.smallDot, { backgroundColor: randomColor }]} />
        <Text
          style={styles.groupName}
          onPress={() => {
            navigation.navigate("GroupInfo", { groupId: groups.id });
          }}
        >
          {item.name}
        </Text>
        <SimpleLineIcons
          name="options-vertical"
          size={20}
          style={{ alignItems: "flex-end" }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.createButtonContainer}>
        <CustomButton
          text="Create a Group"
          style={styles.createButton}
          onPressHandler={() => navigation.navigate("Create a Group")}
        />
      </View>
      <View style={styles.hundredpercenContainer}>
        <FlatList
          data={groups}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};
