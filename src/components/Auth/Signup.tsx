import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useRef, useState } from "react";
import { ActivityIndicator, Image, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { server } from "../../api/server";
import { SIGN_UP } from "../../redux/types/Authtypes";
import { CustomButton } from "../UtilComponents/CustomButton";
import { KeyboardDismiss } from "../UtilComponents/KeyboardDismiss";
import { AuthStyles as Styles } from "../styles";
import { AuthNavProps } from "./AuthTypes";

type UserData = {
  name: string;
  email: string;
  password: string;
  username: string;
};

//! TO DO: Build a modal that pops up for error messages
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
  const [loading, setLoading] = useState<boolean>(false);

  // Reducers dispatch
  const dispatch = useDispatch();

  const signup = async () => {
    try {
      setLoading(true);
      const res = await server.post("/users/signup", userData);
      const userToken = res.data.token;
      await AsyncStorage.setItem("userToken", userToken);
      dispatch({
        type: SIGN_UP,
        payload: {
          user: {
            _id: res.data.user._id,
            email: res.data.user.email,
            name: res.data.user.name,
            user_status: res.data.user.user_status,
            username: res.data.user.username,
            avatar: res.data.user.avatar,
          },
          token: res.data.token,
        },
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
      if (e.response && e.response.data.error) {
        setLoading(false);
        return setError(e.response.data.error);
      }
      setLoading(false);
      return setError(e.message);
    }
  };

  // Refs for next button on keyboard
  const usernameRef: any = useRef();
  const emailRef: any = useRef();
  const passwordRef: any = useRef();
  const secondPasswordRef: any = useRef();

  const onSignUp = async () => {
    if (userData.username.length < 3) {
      return setError("Username must have atleast three letters");
    }
    if (userData.password.length < 6) {
      return setError("Password must have atleast six letters");
    }
    setError("");
    if (userData.password !== passwordVerify.password) {
      return setError("Passwords do not match");
    }
    await signup();
  };

  return (
    <KeyboardDismiss>
      <Text style={Styles.title}> Watch Together</Text>
      <Image
        style={{
          height: 300,
          width: 300,
          flexWrap: "wrap",
          flexShrink: 1,
          paddingBottom: 10,
        }}
        resizeMode="contain"
        source={require("./assets/Signup.png")}
      ></Image>
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
          blurOnSubmit={false}
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
      {loading ? (
        <View style={{ ...Styles.button, padding: 25 }}>
          <ActivityIndicator style={{ flex: 1 }} color="#fff" />
        </View>
      ) : (
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
      )}
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
