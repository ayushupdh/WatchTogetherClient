import React, { useState } from "react";
import { Center } from "../../dumbComponents/Center";
import { Text, View } from "react-native";
import { FormField } from "../FormField";
import { GroupsDataType, GroupsNavProps } from "../Navigation/GroupsTypes";
import { styles } from "../styles";
import { CustomButton } from "../../dumbComponents/CustomButton";
import { Timer } from "../../dumbComponents/Timer";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { showAlert } from "../../dumbComponents/Alert";
export const CreateGroupForm = ({
  navigation,
}: GroupsNavProps<"Create a Group">) => {
  const groupData: GroupsDataType = {
    genres: [
      "Drama",
      "Crime",
      "Comedy",
      "Action",
      "Thriller",
      "Documentary",
      "Adventure",
      "Horror",
    ],
    languages: ["English", "German", "Spanish", "French", "Arabic"],
    time: "",
    providers: ["Netflix", "Hulu", "Amazon Prime"],
  };
  const [name, setName] = useState<string>("");
  const [time, setTime] = useState<{ min: string; sec: string }>({
    min: "00",
    sec: "00",
  });
  const [genres, setGenres] = useState<string[]>([]);
  const [lang, setLang] = useState<string[]>([]);
  const [provider, setProvider] = useState<string[]>([]);
  const [error, seterror] = useState<string>("");

  const handleGenre = (text: string, value: boolean) => {
    if (value) {
      setGenres((prev) => prev.concat(text));
    } else {
      setGenres((prev) => prev.filter((el) => el !== text));
    }
  };
  const handleLang = (text: string, value: boolean) => {
    if (value) {
      setLang((prev) => prev.concat(text));
    } else {
      setLang((prev) => prev.filter((el) => el !== text));
    }
  };
  const handleProvider = (text: string, value: boolean) => {
    if (value) {
      setProvider((prev) => prev.concat(text));
    } else {
      setProvider((prev) => prev.filter((el) => el !== text));
    }
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
              value={name}
              onChangeHandler={(name: string) => setName(name)}
              error={error}
              autoFocus={true}
            />
            <Timer time={time} setTime={setTime} />

            {/* select genres */}
            <Text style={styles.groupTitle}>Select Genres</Text>
            <View style={styles.selectionContainer}>
              {groupData.genres.map((p) => (
                <SelectionButtons key={p} text={p} onSelect={handleGenre} />
              ))}
            </View>
            <View
              style={{
                paddingTop: 30,
                marginLeft: 20,
                marginRight: 20,
                flex: 1,
              }}
            ></View>
            {/* select Lang */}
            <Text style={styles.groupTitle}>Select Languages</Text>

            <View style={styles.selectionContainer}>
              {groupData.languages.map((p) => (
                <SelectionButtons key={p} text={p} onSelect={handleLang} />
              ))}
            </View>
            <View
              style={{
                paddingTop: 30,
                marginLeft: 20,
                marginRight: 20,
                flex: 1,
              }}
            ></View>

            {/* select providers */}
            <Text style={styles.groupTitle}>Select Providers</Text>

            <View style={styles.selectionContainer}>
              {groupData.providers.map((p) => (
                <SelectionButtons key={p} text={p} onSelect={handleProvider} />
              ))}
            </View>
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
              style={
                name === ""
                  ? styles.unsubmittedButton
                  : { ...styles.unsubmittedButton, opacity: 1 }
              }
              onPressHandler={() => {
                name !== ""
                  ? navigation.navigate("Add a Friend", {
                      groupName: name,
                    })
                  : showAlert({
                      firstText: "Group Name is required",
                      firstButtonText: "ok",
                    });
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

type SelectionButtonPropType = {
  text: string;
  onSelect?: (text: string, value: boolean) => void;
};
const SelectionButtons = (props: any) => {
  const [state, setstate] = useState(false);
  const handler = () => {
    setstate((prev) => !prev);
    props.onSelect(props.text, !state);
  };
  return (
    <CustomButton
      text={props.text}
      style={{
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: state ? "#F78473" : "#f4f4f4",
        marginHorizontal: 8,
        marginVertical: 8,
        borderRadius: 20,
        shadowOffset: { width: 5, height: 4 },
        shadowColor: "#000",
        shadowOpacity: 0.4,
      }}
      onPressHandler={handler}
      textStyle={{ color: state ? "white" : "black" }}
    />
  );
};
