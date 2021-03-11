import React, { useState } from "react";
import { Center } from "../dumbComponents/Center";
import { Text, View } from "react-native";
import { FormField } from "./FormField";
import { GroupsDataType, GroupsNavProps } from "./Navigation/GroupsTypes";
import { styles } from "./styles";
import { CustomButton } from "../dumbComponents/CustomButton";
export const CreateGroupForm = ({
  navigation,
}: GroupsNavProps<"Group Session">) => {
  const [groupData, setGroupData] = useState<GroupsDataType>({
    name: "",
    genres: [],
    languages: [],
    time: "",
  });
  const [error, seterror] = useState<string>("");

  return (
    <View style={styles.container}>
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
          placeholder="Genre"
          title="Select Genres"
          value={groupData.genres[0]}
          onChangeHandler={(name: string) =>
            setGroupData({ ...groupData, genres: ["ok"] })
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
        <FormField
          placeholder=" Time Limit"
          title="Select Time Limit"
          value={groupData.name}
          onChangeHandler={(name: string) =>
            setGroupData({ ...groupData, name })
          }
          error={error}
        />

        <CustomButton
          text={"Next"}
          style={styles.unsubmittedButton}
          onPressHandler={() =>
            navigation.navigate("SelectGenres", { groupName: groupData.name })
          }
        />
      </View>
    </View>
  );
};
