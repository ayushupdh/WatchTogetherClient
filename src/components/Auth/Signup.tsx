import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { server } from "../../api/server";
import { SIGN_UP } from "../../redux/types/Authtypes";
import { CustomButton } from "../dumbComponents/CustomButton";
import { KeyboardDismiss } from "../dumbComponents/KeyboardDismiss";
import { AuthStyles as Styles } from "../styles";
import { AuthNavProps } from "./AuthTypes";

type UserData = {
  name: string;
  email: string;
  password: string;
  username: string;
};

//! TO DO: Build a modal that pops up for error messages
//! Figure out a better way to handle these many state(handle password hide)
const Signup = ({ navigation }: AuthNavProps<"Signup">) => {
  // States for user, password hide/show, error
  const [userData, setUserData] = useState<UserData>({
    username: "",
    password: "",
    email: "",
    name: "",
  });

  const [passwordVerify, setPassword] = useState({ password: "", hide: true });
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState<string>("");

  // Reducers dispatch
  const dispatch = useDispatch();

  const signup = async () => {
    try {
      const res = await server.post("/users/signup", userData);
      const userToken = res.data.token;
      await AsyncStorage.setItem("userToken", userToken);
      dispatch({
        type: SIGN_UP,
        payload: {
          user: {
            username: res.data.user.name,
          },
          token: res.data.token,
        },
      });
    } catch (e) {
      if (e.response && e.response.data.error) {
        return setError(e.response.data.error);
      }
      return setError(e.message);
    }
  };

  // Refs for next button on keyboard
  const usernameRef: any = useRef();
  const emailRef: any = useRef();
  const passwordRef: any = useRef();
  const secondPasswordRef: any = useRef();

  const onSignUp = () => {
    setError("");
    if (userData.password !== passwordVerify.password) {
      return setError("Passwords do not match");
    }
    signup();
  };

  return (
    <KeyboardDismiss>
      <Text style={Styles.title}> Watch Together</Text>
      <View style={Styles.textInputView}>
        <TextInput
          style={Styles.inputBox}
          placeholder="Name"
          onChangeText={(text) => {
            setError("");
            setUserData({ ...userData, name: text });
          }}
          value={userData.name}
          returnKeyType="next"
          onSubmitEditing={() => usernameRef.current?.focus()}
          textContentType="username"
        />
        <TextInput
          ref={usernameRef}
          style={Styles.inputBox}
          placeholder="Username"
          onChangeText={(text) => {
            setError("");
            setUserData({ ...userData, username: text });
          }}
          value={userData.username}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
          textContentType="username"
        />

        <TextInput
          ref={emailRef}
          style={Styles.inputBox}
          placeholder="Email"
          onChangeText={(text) => {
            setError("");
            setUserData({ ...userData, email: text });
          }}
          value={userData.email}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          textContentType="username"
        />

        <TextInput
          ref={passwordRef}
          style={Styles.inputBox}
          placeholder="Password"
          onChangeText={(text) => {
            setError("");
            setUserData({ ...userData, password: text });
          }}
          value={userData.password}
          returnKeyType="next"
          textContentType="password"
          secureTextEntry={hidePassword}
          onSubmitEditing={() => {
            secondPasswordRef.current?.focus();
          }}
          blurOnSubmit={false}
        />
        {userData.password !== "" && (
          <Text
            style={Styles.passwordReveal}
            onPress={() => setHidePassword(!hidePassword)}
          >
            {hidePassword ? "Show Password" : "Reveal Password"}
          </Text>
        )}
        <TextInput
          ref={secondPasswordRef}
          placeholder="Re enter Password"
          style={Styles.inputBox}
          onChangeText={(text) => {
            setError("");
            setPassword({ ...passwordVerify, password: text });
          }}
          value={passwordVerify.password}
          returnKeyType="done"
          textContentType="password"
          secureTextEntry={passwordVerify.hide}
        />
        {passwordVerify.password !== "" && (
          <Text
            style={Styles.passwordReveal}
            onPress={() =>
              setPassword({ ...passwordVerify, hide: !passwordVerify.hide })
            }
          >
            {passwordVerify.hide ? "Show Password" : "Reveal Password"}
          </Text>
        )}
      </View>
      {error === "" ? null : <Text style={Styles.mainErrorText}>{error}</Text>}
      <CustomButton
        onPressHandler={onSignUp}
        text={"Signup"}
        style={
          userData.username === "" ||
          userData.password === "" ||
          userData.email === "" ||
          userData.name === "" ||
          passwordVerify.password === ""
            ? Styles.disabledButton
            : Styles.button
        }
        disabled={
          userData.username === "" ||
          userData.password === "" ||
          userData.email === "" ||
          userData.name === "" ||
          passwordVerify.password === ""
        }
      />
      <View style={Styles.bottomTextContainer}>
        <Text style={Styles.bottomPlainText}>I have an account!</Text>
        <Text
          onPress={() => {
            navigation.navigate("Signin");
          }}
          style={Styles.bottomPlainTextBlue}
        >
          Sign In
        </Text>
      </View>
    </KeyboardDismiss>
  );
};

export default Signup;
