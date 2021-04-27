import React, { useState } from "react";
import {
  TouchableHighlight,
  Text,
  StyleProp,
  ViewStyle,
  View,
} from "react-native";
import { styles } from "../GroupsView/styles";

type ColorChangeButtonProps = {
  onPressHandler?: () => void;
  style?: StyleProp<ViewStyle>;
  text: string;
};

type ColorChangeFieldProps = {
  titleText: string;
  data: string[];
};

export const ColorChangeButton = (props: ColorChangeButtonProps) => {
  const [clicked, changedClicked] = useState(false);

  return (
    <TouchableHighlight
      underlayColor={"#EF9A99"}
      onPress={() => changedClicked((prevState) => !prevState)}
      style={{
        padding: 10,
        backgroundColor: clicked ? "#37BEB0" : "#f4f4f4",
        marginHorizontal: 8,
        marginVertical: 8,
        borderRadius: 20,
        shadowOffset: { width: 5, height: 4 },
        shadowColor: "#000",
        shadowOpacity: 0.4,
      }}
    >
      <Text style={{ color: clicked ? "white" : "black" }}>{props.text}</Text>
    </TouchableHighlight>
  );
};

export const ColorChangeField = (props: ColorChangeFieldProps) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={styles.groupTitle}>{props.titleText}</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {props.data.map((genre: string) => {
          return (
            <ColorChangeButton
              key={Math.floor(Math.random() * 16777215).toString(16)}
              text={genre}
            />
          );
        })}
      </View>
    </View>
  );
};
