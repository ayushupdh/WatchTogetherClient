import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { MutableRefObject, useRef, useState } from "react";
import { Switch, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { server } from "../../api/server";
import { SIGN_IN } from "../../redux/types/Authtypes";
import { CustomButton } from "../dumbComponents/CustomButton";
import { KeyboardDismiss } from "../dumbComponents/KeyboardDismiss";
import { AuthStyles as Styles } from "../styles";
import { AuthNavProps, LoginDataType } from "./AuthTypes";
import { PasswordBox } from "../dumbComponents/PasswordBox";
const Signin = ({ navigation }: AuthNavProps<"Signin">) => {
  const [userData, setUserData] = useState<LoginDataType>({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const login = async () => {
    try {
      const res = await server.post("/users/login", userData);
      const userToken = res.data.token;
      await AsyncStorage.setItem("userToken", userToken);
      dispatch({
        type: SIGN_IN,
        payload: {
          user: {
            username: res.data.user.name,
          },
        },
      });
    } catch (e) {
      setError("Invalid username or password");
    }
  };
  // const {signin} =useContext(AuthContext);
  const onSigninPress = async () => {
    if (userData.username === "" || userData.password === "") {
      setError("Missing username or password");
      return;
    }
    login();
  };

  return (
    <KeyboardDismiss>
      <Text style={Styles.title}> Watch Together</Text>
      <View style={Styles.textInputView}>
        <TextInput
          style={Styles.inputBox}
          placeholder="Username or Email"
          onChangeText={(text) => {
            setUserData({ ...userData, username: text });
          }}
          onFocus={() => setError("")}
          value={userData.username}
          returnKeyType="next"
          // onSubmitEditing={() => {
          //   setFocus(true);
          // }}
          textContentType="username"
        />
        <PasswordBox
          placeholder="password"
          onChangeText={(text) => {
            setUserData({ ...userData, password: text });
          }}
          value={userData.password}
        />
      </View>
      {error === "" ? null : <Text style={Styles.errorText}>{error}</Text>}

      <CustomButton
        onPressHandler={onSigninPress}
        text={"Login"}
        style={Styles.button}
      />

      <View style={Styles.altTextContainer}>
        <Text style={Styles.altText}>I am a new user!</Text>
        <Text
          onPress={() => {
            navigation.navigate("Signup");
            setUserData({ username: "", password: "" });
            setError("");
          }}
          style={Styles.altTextBlue}
        >
          Sign me up
        </Text>
      </View>
    </KeyboardDismiss>
  );
};

export default Signin;
