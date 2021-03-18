import React from "react";
import { Text, View } from "react-native";
import { Styles } from "../HomeView/styles";
import { CustomButton } from "../dumbComponents/CustomButton";
import { HomeViewNavProps } from "./Navigation/HomeViewTypes";
type HomeMainProps = {};
export const HomeViewMain = ({
  navigation,
}: HomeViewNavProps<"Watch Together">) => {
  return (
    <View style={Styles.container}>
      <View style={Styles.eightyPercenContainer}>
        <Text style={Styles.introText}>
          Do you want to start a Group or Single session?
        </Text>
        <CustomButton
          text="Group"
          onPressHandler={() => {
            navigation.navigate("Your Groups");
          }}
          style={Styles.groupsButton}
          textStyle={Styles.buttonText}
        />
        <CustomButton
          text="Single"
          style={Styles.singleButton}
          textStyle={Styles.buttonText}
          onPressHandler={() => {
            navigation.navigate("Select options");
          }}
        />
      </View>
    </View>
  );
};
