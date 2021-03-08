import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { SIGN_OUT } from "../../redux/types/Authtypes";
import { Center } from "../dumbComponents/Center";

type HomeMainProps = {};
export const HomeViewMain = (props: HomeMainProps) => {
  const dispatch = useDispatch();
  const onLogoutPress = async () => {
    await AsyncStorage.removeItem("userToken");
    dispatch({
      type: SIGN_OUT,
    });
  };
  return (
    <Center>
      <Text style={{ fontSize: 20 }}>Home View</Text>
      <View style={{ marginTop: 200 }}>
        <Button
          onPress={onLogoutPress}
          title="Logout"
          color="#121"
          accessibilityLabel="Logout Button"
        />
      </View>
    </Center>
  );
};
