import React, { useEffect, useRef, useState } from "react";
import { Text, Image, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

import { AuthPayload, SIGN_OUT } from "../../redux/types/Authtypes";

import { CustomButton } from "../UtilComponents/CustomButton";
import { Styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AccountNavProps } from "./Navigation/AccountTypes";
import { socketClient } from "../../api/io/io";

export const AccountMain = ({
  navigation,
}: AccountNavProps<"Your Account">) => {
  const user = useSelector(
    ({ auth }: { auth: { user: AuthPayload } }) => auth.user
  );

  const dispatch = useDispatch();
  const onLogoutPress = async () => {
    socketClient.disconnect();
    await AsyncStorage.removeItem("userToken");
    dispatch({
      type: SIGN_OUT,
    });
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.avatarContainer}>
        {user && user.avatar && user.avatar !== "" ? (
          <Image style={Styles.avatar} source={{ uri: user.avatar }}></Image>
        ) : (
          <FontAwesome
            name="user-circle-o"
            style={Styles.avatar}
            size={110}
            color="black"
          />
        )}
        <View style={Styles.avatarNameContainer}>
          <Text style={Styles.avatarText}>{user.name}</Text>
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
          text="About"
          style={Styles.button}
          textStyle={Styles.buttonText}
          onPressHandler={() => navigation.navigate("About")}
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
