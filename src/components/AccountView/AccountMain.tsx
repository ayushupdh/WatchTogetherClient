import React from "react";
import { Text } from "react-native";
import { useDispatch } from "react-redux";
import { SIGN_OUT } from "../../redux/types/Authtypes";
import { Center } from "../dumbComponents/Center";
import { CustomButton } from "../dumbComponents/CustomButton";
import { Styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AccountMainProps = {};
export const AccountMain = (props: AccountMainProps) => {
  const dispatch = useDispatch();
  const onLogoutPress = async () => {
    await AsyncStorage.removeItem("userToken");
    dispatch({
      type: SIGN_OUT,
    });
  };
  return (
    <Center>
      <Text>AccountMain</Text>
      <CustomButton
        text={"Add Friend"}
        style={Styles.button}
        textStyle={Styles.buttonText}
        pressedColor="#red"
      ></CustomButton>
      <CustomButton
        text={"..."}
        style={Styles.button}
        textStyle={Styles.buttonText}
      ></CustomButton>
      <CustomButton
        text={"..."}
        style={Styles.button}
        textStyle={Styles.buttonText}
      ></CustomButton>
      <CustomButton
        onPressHandler={onLogoutPress}
        text={"Logout"}
        style={Styles.redButton}
      ></CustomButton>
    </Center>
  );
};
