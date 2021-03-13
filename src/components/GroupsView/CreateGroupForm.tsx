import React, { useState } from "react";
import { Center } from "../dumbComponents/Center";
import { Text, View } from "react-native";
import { FormField } from "./FormField";
import { GroupsDataType, GroupsNavProps } from "./Navigation/GroupsTypes";
import { styles } from "./styles";
import { CustomButton } from "../dumbComponents/CustomButton";
import { Timer } from "../dumbComponents/Timer";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import {
  ColorChangeButton,
  ColorChangeField,
} from "../dumbComponents/ColorChangeField";
import {
  Dropdown,
  GroupDropdown,
  MultiselectDropdown,
} from "sharingan-rn-modal-dropdown";
export const CreateGroupForm = ({
  navigation,
}: GroupsNavProps<"Create a Group">) => {
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
    ],
    languages: ["English", "Japanese", "Chinese"],
    time: "",
  });
  const [error, seterror] = useState<string>("");
  const [valueMS, setValueMS] = useState<string[]>([]);
  const onChangeMS = (value: string[]) => {
    setValueMS(value);
  };
  const onPressHandler = () => {
    console.log("h");
  };
  return (
    <View style={styles.container}>
      <View style={{ width: "100%", flex: 1, paddingTop: 10 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            alignItems: "center",
            paddingBottom: 20,
          }}
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
            <Timer />

            <ColorChangeField
              data={groupData.genres}
              titleText={"Select Genres"}
            />
            <ColorChangeField
              data={groupData.languages}
              titleText={"Select Languages"}
            />

            <View
              style={{
                paddingTop: 30,
                marginLeft: 20,
                marginRight: 20,
                flex: 1,
              }}
            ></View>

            <CustomButton
              text={"Next"}
              style={styles.unsubmittedButton}
              onPressHandler={() =>
                navigation.navigate("Add a Friend", {
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
