import React from "react";
import { useDispatch } from "react-redux";
import { Text, View } from "react-native";

import { Center } from "../dumbComponents/Center";
import { Styles } from "../HomeView/styles";
import { CustomButton } from "../dumbComponents/CustomButton";

type HomeMainProps = {};
export const HomeViewMain = (props: HomeMainProps) => {
  return (
    <View style={Styles.container}>
      <View style={Styles.eightyPercenContainer}>
        <Text style={Styles.introText}>
          Do you want to start a Group or Single session?
        </Text>
        <CustomButton
          text="Group"
          style={Styles.groupsButton}
          textStyle={Styles.buttonText}
        />
        <CustomButton
          text="Single"
          style={Styles.singleButton}
          textStyle={Styles.buttonText}
        />
      </View>
    </View>
  );
};
