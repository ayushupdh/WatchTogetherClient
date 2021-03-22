import React from "react";
import { Text, Image, View } from "react-native";
import { useDispatch } from "react-redux";
import { SIGN_OUT } from "../../redux/types/Authtypes";
import { Center } from "../dumbComponents/Center";
import { CustomButton } from "../dumbComponents/CustomButton";
import { Styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AccountNavProps } from "./Navigation/AccountTypes";

export const AccountMain = ({
  navigation,
}: AccountNavProps<"Your Account">) => {
  const dispatch = useDispatch();
  const onLogoutPress = async () => {
    await AsyncStorage.removeItem("userToken");
    dispatch({
      type: SIGN_OUT,
    });
  };
  return (
    <View style={Styles.container}>
      <View style={Styles.avatarContainer}>
        <Image style={Styles.avatar} source={require("./avatar.png")}></Image>
        <View style={Styles.avatarNameContainer}>
          <Text style={Styles.avatarText}>Ayush Upadhyay</Text>
          <CustomButton
            style={Styles.editprofileButton}
            textStyle={Styles.editprofileButtonText}
            text={"Edit Profile"}
            onPressHandler={() => navigation.navigate("Edit Profile")}
          />
        </View>
      </View>
      <View style={Styles.buttonsContainer}>
        <CustomButton
          text={"Your Friends"}
          style={Styles.button}
          textStyle={Styles.buttonText}
          pressedColor="#red"
          onPressHandler={() => navigation.navigate("Friends")}
        />
        <CustomButton
          text={"Your Likes"}
          style={Styles.button}
          textStyle={Styles.buttonText}
          onPressHandler={() => navigation.navigate("Likes")}
        />
        <CustomButton
          text="Submit Feedback"
          style={Styles.button}
          textStyle={Styles.buttonText}
        />
        <CustomButton
          onPressHandler={onLogoutPress}
          text={"Logout"}
          style={Styles.redButton}
          textStyle={{ fontWeight: "bold", fontSize: 22 }}
        />
      </View>
    </View>
  );
};
