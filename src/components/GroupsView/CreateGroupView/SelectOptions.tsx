import React, { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { color } from "react-native-reanimated";
import { CustomButton } from "../../UtilComponents/CustomButton";
import { Timer } from "../../UtilComponents/Timer";
import { GroupsDataType, GroupsNavProps } from "../Navigation/GroupsTypes";
import { styles } from "../styles";

type SelectOptionsProps = {};

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

export const SelectOptions = ({
  navigation,
  route,
}: GroupsNavProps<"Select Options">) => {
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
  const [genres, setGenres] = useState<string[]>([]);
  const [lang, setLang] = useState<string[]>([]);
  const [provider, setProvider] = useState<string[]>([]);
  const [time, setTime] = useState<{ min: string; sec: string }>({
    min: "00",
    sec: "00",
  });
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
    <View>
      <View
        style={{
          alignItems: "center",

          paddingVertical: 5,

          marginTop: 10,
        }}
      >
        <TextInput
          editable={false}
          style={{
            fontSize: 20,
            fontWeight: "500",
            borderRadius: 30,
            color: "white",
            paddingVertical: 8,
            paddingHorizontal: 20,
            backgroundColor: "#313B68",
          }}
        >
          {route.params.groupName}
        </TextInput>
      </View>
      <Timer time={time} setTime={setTime} />

      <Text style={styles.groupTitle}>Select Genres</Text>
      <View style={styles.selectionContainer}>
        {groupData.genres.map((p) => (
          <SelectionButtons key={p} text={p} onSelect={handleGenre} />
        ))}
      </View>
      <Text style={styles.groupTitle}>Select Languages</Text>
      <View style={styles.selectionContainer}>
        {groupData.languages.map((p) => (
          <SelectionButtons key={p} text={p} onSelect={handleLang} />
        ))}
      </View>
      <Text style={styles.groupTitle}>Select Platform</Text>
      <View style={styles.selectionContainer}>
        {groupData.providers.map((p) => (
          <SelectionButtons key={p} text={p} onSelect={handleProvider} />
        ))}
      </View>
    </View>
  );
};
