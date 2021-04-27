import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { startSingleSession } from "../../redux/actions/sessionAction";
import { CREATE_SESSION } from "../../redux/types/SessionTypes";
import { Styles } from "../AccountView/styles";
import { ColorChangeField } from "../UtilComponents/ColorChangeField";
import { CustomButton } from "../UtilComponents/CustomButton";
import { HomeViewNavProps } from "./Navigation/HomeViewTypes";

type SelectOptionsProps = {};
export const SelectOptions = ({
  navigation,
}: HomeViewNavProps<"Select options">) => {
  // State vars
  const [genres, setGenres] = useState<string[]>([]);
  const [lang, setLang] = useState<string[]>([]);
  const [providers, setProvider] = useState<string[]>([]);
  const dispatch = useDispatch();

  // Options to display
  const genreList = [
    { text: "Action", _id: "123754" },
    { text: "Adventure", _id: "13asc4" },
    { text: "Comedy", _id: "123vwev54" },
    { text: "Crime", _id: "wevc" },
    { text: "Documentary", _id: "scasc" },
    { text: "Drama", _id: "ever" },
    { text: "Fantasy", _id: "13XCA4" },
    { text: "Horror", _id: "198234" },
    { text: "Mystery", _id: "13ZXC4" },
    { text: "Romance", _id: "134ssdv" },
    { text: "Science Fiction", _id: "dsv" },
    { text: "Thriller", _id: "1265734" },
  ];
  const langList = [
    { text: "English", _id: "12324" },
    { text: "German", _id: "134" },
    { text: "French", _id: "44" },
    { text: "Spanish", _id: "75" },
    { text: "Italian", _id: "87" },
    { text: "Russian", _id: "345" },
    { text: "Japanese", _id: "654" },
  ];
  const providerList = [
    { text: "DIRECTV", _id: "1" },
    { text: "HBO Max", _id: "00012" },
    { text: "fuboTV", _id: "were" },
    { text: "Amazon Prime Video", _id: "tebrt" },
    { text: "HBO Now", _id: "asdqw" },
    { text: "Pluto TV", _id: "scvsd" },
    { text: "Hulu", _id: "sdv" },
    { text: "Netflix", _id: "dvsd" },
    { text: "Disney Plus", _id: "8776" },
  ];

  // State handlers start
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
  // State handlers end

  // Single session start handler
  const handleStart = () => {
    startSingleSession({ genres, providers, lang }, dispatch);
    // dispatch({
    //   type: CREATE_SESSION,
    //   payload: {
    //     sessionType: "Single",
    //     genres,
    //     providers: providers,
    //     lang,
    //   },
    // });

    navigation.navigate("SwipingView", { groupName: "Single" });
  };
  return (
    <View style={{ ...Styles.container, alignItems: "center" }}>
      <View style={{ flexBasis: 100, width: "100%" }}>
        <Text style={Styles.selectionTitleText}>Select genres</Text>

        <FlatList
          contentContainerStyle={{ marginHorizontal: 20 }}
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <SelectionButtons text={item.text} onSelect={handleGenre} />
          )}
          data={genreList}
          keyExtractor={(item) => item._id}
          horizontal
        />
      </View>
      <View style={{ flexBasis: 100, width: "100%" }}>
        <Text style={Styles.selectionTitleText}>Select Languages</Text>
        <FlatList
          contentContainerStyle={{ marginHorizontal: 20 }}
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <SelectionButtons text={item.text} onSelect={handleLang} />
          )}
          data={langList}
          keyExtractor={(item) => item._id}
          horizontal
        />
      </View>
      <View style={{ flexBasis: 100, width: "100%" }}>
        <Text style={Styles.selectionTitleText}>Select Platform</Text>
        <FlatList
          contentContainerStyle={{ marginHorizontal: 20 }}
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <SelectionButtons text={item.text} onSelect={handleProvider} />
          )}
          data={providerList}
          keyExtractor={(item) => item._id}
          horizontal
        />
      </View>
      {/* <View
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
      </View> */}
      {/* <Text style={Styles.selectionTitleText}>Select Languages</Text>
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
      */}
      <CustomButton
        text="Start"
        style={{ ...Styles.nextButton, marginTop: 50 }}
        onPressHandler={() => {
          handleStart();
        }}
      />
    </View>
  );
};

// Custom Selection Button Component
type SelectButtonProps = {
  text: string;
  onSelect: (text: string, state: boolean) => void;
};
const SelectionButtons = (props: SelectButtonProps) => {
  const [state, setstate] = useState<boolean>(false);
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
          backgroundColor: state ? "#37BEB0" : "#f4f4f4",
          marginHorizontal: 8,
          marginVertical: 8,
          borderRadius: 20,
          shadowOffset: { width: 5, height: 4 },
          shadowColor: "#000",
          shadowOpacity: 0.4,
          elevation: 5,
        }}
        onPressHandler={handler}
        textStyle={{ color: state ? "white" : "black" }}
      />
    </View>
  );
};
