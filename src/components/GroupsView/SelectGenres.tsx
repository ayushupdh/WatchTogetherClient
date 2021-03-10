import React from "react";
import { View, Text } from "react-native";
import { CustomButton } from "../dumbComponents/CustomButton";
import { GroupsNavProps } from "./GroupsTypes";
import { styles } from "./styles";

export const SelectGenres = ({
  navigation,
}: GroupsNavProps<"SelectGenres">) => {
  const genres = [
    "Dummy",
    "Dummy 123",
    "DataDummy",
    "AnotherDummy",
    "Dummy",
    "Dummy",
    "Dummy",
    "Dummy",
    "Dummy",
    "Dummy",
  ];
  return (
    <View style={styles.container}>
      <Text
        style={{
          marginHorizontal: 28,
          marginVertical: 8,
          fontSize: 20,
        }}
      >
        Select Genres
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          flex: 0.6,
          overflow: "hidden",
        }}
      >
        {genres.map((genre) => {
          return (
            <View
              key={Math.floor(Math.random() * 16777215).toString(16)}
              style={{
                padding: 10,
                backgroundColor: "#aaa",
                marginHorizontal: 8,
                marginVertical: 8,
              }}
            >
              <Text>{genre}</Text>
            </View>
          );
        })}
      </View>
      <CustomButton
        text={"Next"}
        style={[styles.unsubmittedButton, { width: "80%" }]}
        onPressHandler={() => navigation.navigate("Add a Friend")}
      />
    </View>
  );
};
