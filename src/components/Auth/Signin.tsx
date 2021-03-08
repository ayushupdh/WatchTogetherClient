import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createRef, useState } from "react";
import { Switch, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { server } from "../../api/server";
import { SIGN_IN } from "../../redux/types/Authtypes";
import { CustomButton } from "../dumbComponents/CustomButton";
import { KeyboardDismiss } from "../dumbComponents/KeyboardDismiss";
import { AuthStyles as Styles } from "../styles";
import { AuthNavProps, LoginDataType } from "./AuthTypes";

const Signin = ({ navigation }: AuthNavProps<"Signin">) => {
  // States for users, errors and passwordView

  const [userData, setUserData] = useState<LoginDataType>({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  // Reducer dispatch
  const dispatch = useDispatch();

  // Login Action
  // !Maybe add more custom login error texts
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
      if (e.message) {
        return setError(e.message);
      }
      setError("Invalid username or password");
    }
  };
  // For future if ever need to add more checks before login
  const onSigninPress = async () => {
    await login();
  };

  // Password refs for next on
  const passwordRef: any = createRef<TextInput>();

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
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          textContentType="username"
        />
        <TextInput
          ref={passwordRef}
          placeholder="Password"
          onChangeText={(text: string) => {
            setUserData({ ...userData, password: text });
            setError("");
          }}
          blurOnSubmit={false}
          style={Styles.inputBox}
          returnKeyType="done"
          textContentType="password"
          secureTextEntry={hidePassword}
          defaultValue=""
        />
        {userData.password !== "" && (
          <Text
            style={Styles.passwordReveal}
            onPress={() => setHidePassword(!hidePassword)}
          >
            {hidePassword ? "Reveal Password" : "Show Password"}{" "}
          </Text>
        )}
      </View>
      {error === "" ? null : <Text style={Styles.mainErrorText}>{error}</Text>}

      <CustomButton
        onPressHandler={onSigninPress}
        text={"Login"}
        style={
          userData.username === "" || userData.password === ""
            ? Styles.disabledButton
            : Styles.button
        }
        disabled={userData.username === "" || userData.password === ""}
      />

      <View style={Styles.bottomTextContainer}>
        <Text style={Styles.bottomPlainText}>I am a new user!</Text>
        <Text
          onPress={() => {
            navigation.navigate("Signup");
            setUserData({ ...userData, username: "", password: "" });
            setError("");
          }}
          style={Styles.bottomPlainTextBlue}
        >
          Sign me up
        </Text>
      </View>
    </KeyboardDismiss>
  );
};

export default Signin;
