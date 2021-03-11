import React, { useState } from "react";
import { Center } from "../dumbComponents/Center";
import { Text, View } from "react-native";
import { FormField } from "./FormField";
import { GroupsDataType, GroupsNavProps } from "./Navigation/GroupsTypes";
import { styles } from "./styles";
import { CustomButton } from "../dumbComponents/CustomButton";
import { Timer } from "../dumbComponents/Timer";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
export const CreateGroupForm = ({
  navigation,
}: GroupsNavProps<"Group Session">) => {
  const [groupData, setGroupData] = useState<GroupsDataType>({
    name: "",
    genres: [
      "Action",
      "Adventure",
      "Comedy",
      "Romance",
      "Horror",
      "Romcom",
      "Thriller",
      "Musical",
      "Dummy",
      "Dummy",
      "Dummy",
      "Dummy",
      "Dummy",
      "Dummy",
    ],
    languages: [],
    time: "",
  });
  const [error, seterror] = useState<string>("");

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", flex: 1, marginVertical: 20 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <View style={styles.createGroupContainer}>
            <FormField
              placeholder="Name"
              title="Group Name"
              value={groupData.name}
              onChangeHandler={(name: string) =>
                setGroupData({ ...groupData, name })
              }
              error={error}
            />
            <FormField
              placeholder="Language"
              title="Select Languages"
              value={groupData.languages[0]}
              onChangeHandler={(name: string) =>
                setGroupData({ ...groupData, languages: ["ok lol"] })
              }
              error={error}
            />

            <Timer />

            <Text style={styles.groupTitle}>Select Genres</Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                // justifyContent: "center",

                overflow: "hidden",
              }}
            >
              {groupData.genres.map((genre) => {
                return (
                  <TouchableHighlight
                    key={Math.floor(Math.random() * 16777215).toString(16)}
                    style={{
                      padding: 10,
                      backgroundColor: "#f4f4f4",
                      marginHorizontal: 8,
                      marginVertical: 8,
                      borderRadius: 20,
                      shadowOffset: { width: 5, height: 4 },
                      shadowColor: "#000",
                      shadowOpacity: 0.4,
                    }}
                  >
                    <Text>{genre}</Text>
                  </TouchableHighlight>
                );
              })}
            </View>

            <CustomButton
              text={"Next"}
              style={styles.unsubmittedButton}
              onPressHandler={() =>
                navigation.navigate("SelectGenres", {
                  groupName: groupData.name,
                })
              }
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
