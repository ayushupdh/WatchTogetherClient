import React from "react";
import { FlatList, Text, View } from "react-native";
import { Center } from "../dumbComponents/Center";
import { useGetGroups } from "../../hooks/useGetGroups";
import { styles } from "./styles";
import { SimpleLineIcons } from "@expo/vector-icons";
import { CustomButton } from "../dumbComponents/CustomButton";
import { GroupsNavProps } from "./GroupsTypes";

export const GroupsMain = ({ navigation }: GroupsNavProps<"Your Groups">) => {
  const { groups, error } = useGetGroups();
  const renderItem = ({ item }: any) => {
    const randomColor: string =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
    return (
      <View style={styles.item}>
        <View style={[styles.smallDot, { backgroundColor: randomColor }]} />
        <Text style={styles.title}>{item.name}</Text>
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
      <CustomButton
        text="Create Group"
        style={styles.createButton}
        onPressHandler={() => navigation.navigate("Group Session")}
      />
      <FlatList
        data={groups}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};