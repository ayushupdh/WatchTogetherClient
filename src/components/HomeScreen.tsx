import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import { SIGN_OUT } from "../redux/types/Authtypes";
import { Center } from "./dumbComponents/Center";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const onLogoutPress = async () => {
    await AsyncStorage.removeItem("userToken");
    dispatch({
      type: SIGN_OUT,
    });
  };
  return (
    <Center>
      <Text style={{ fontSize: 20 }}>
        Hi User ! You will be able to swipe in a minute!
      </Text>
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
}
