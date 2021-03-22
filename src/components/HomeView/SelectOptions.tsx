import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Styles } from "../AccountView/styles";
import { ColorChangeField } from "../dumbComponents/ColorChangeField";
import { CustomButton } from "../dumbComponents/CustomButton";
import { HomeViewNavProps } from "./Navigation/HomeViewTypes";

type SelectOptionsProps = {};
export const SelectOptions = ({
  navigation,
}: HomeViewNavProps<"Select options">) => {
  const [genres, setGenres] = useState<string[]>([]);
  const [lang, setLang] = useState<string[]>([]);
  const [provider, setProvider] = useState<string[]>([]);

  const genreList = [
    { text: "Dark", _id: "12344 " },
    { text: "Action", _id: "123754 " },
    { text: "Adventure", _id: "12324 " },
    { text: "Fantasy", _id: "134 " },
    { text: "Feature", _id: "145234 " },
    { text: "Documentary", _id: "143234 " },
    { text: "Comedy", _id: "12354 " },
    { text: "Drama", _id: "1234234 " },
    { text: "Thriller", _id: "1265734 " },
    { text: "Horror", _id: "198234 " },
  ];
  const langList = [
    { text: "English", _id: "12324 " },
    { text: "Finnish", _id: "134 " },
    { text: "Arabic", _id: "12344 " },
  ];
  const providerList = [
    { text: "Netflix", _id: "1" },
    { text: "Hulu", _id: "00012" },
    { text: "Amazon Prime", _id: "00112" },
  ];

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
    <ScrollView
      style={Styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Text style={Styles.selectionTitleText}>Select genres</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {genreList.map((p) => (
          <SelectionButtons key={p._id} text={p.text} onSelect={handleGenre} />
        ))}
      </View>
      <Text style={Styles.selectionTitleText}>Select Languages</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          overflow: "hidden",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        {langList.map((p) => (
          <SelectionButtons key={p._id} text={p.text} onSelect={handleLang} />
        ))}
      </View>
      <Text style={Styles.selectionTitleText}>Select Providers</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          overflow: "hidden",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        {providerList.map((p) => (
          <SelectionButtons
            key={p._id}
            text={p.text}
            onSelect={handleProvider}
          />
        ))}
      </View>
      <CustomButton
        text="Start"
        style={Styles.nextButton}
        onPressHandler={() => {
          navigation.navigate("SwipingView", { groupName: "Single" });
        }}
      />
    </ScrollView>
  );
};

const SelectionButtons = (props: any) => {
  const [state, setstate] = useState(false);
  const handler = () => {
    setstate((prev) => !prev);
    props.onSelect(props.text, !state);
  };
  return (
    <View>
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
    </View>
  );
};
