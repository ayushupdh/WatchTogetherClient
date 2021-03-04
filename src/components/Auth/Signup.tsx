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
type ErrorData = {
  name: string;
  email: string;
  password: string;
  username: string;
  secondPassword: string;
  main: string;
};

// TO DO:

const Signup = ({ navigation }: AuthNavProps<"Signup">) => {
  const [userData, setUserData] = useState<UserData>({
    username: "",
    password: "",
    email: "",
    name: "",
  });
  const [passwordVerify, setPassword] = useState<string>("");
  const emptyError = {
    username: "",
    password: "",
    email: "",
    name: "",
    secondPassword: "",
    main: "",
  };
  const [error, setError] = useState<ErrorData>(emptyError);
  const dispatch = useDispatch();

  const signup = async () => {
    try {
      const res = await server.post("/users/signup", userData);
      console.log(res.data);
      const userToken = res.data.token;
      await AsyncStorage.setItem("userToken", userToken);
      dispatch({
        type: SIGN_UP,
        payload: {
          user: {
            username: res.data.user.name,
          },
        },
      });
      console.log("Action", res.data.user);
    } catch (e) {
      setError({ ...error, main: e.response.data.error });
      console.log();
      return null;
    }
  };

  const usernameRef: any = useRef();
  const emailRef: any = useRef();
  const passwordRef: any = useRef();
  const secondPasswordRef: any = useRef();

  const onSignUp = () => {
    setError(emptyError);
    if (userData.name === "") {
      return setError({ ...error, name: "Name is required to sign up" });
    } else if (userData.username === "") {
      return setError({
        ...error,
        username: "Username is required to sign up",
      });
    } else if (userData.email === "") {
      return setError({ ...error, email: "Email is required to sign up" });
    } else if (userData.password === "") {
      return setError({
        ...error,
        password: "Password is required to sign up",
      });
    } else if (userData.password !== passwordVerify) {
      return setError({ ...error, secondPassword: "Passwords do not match" });
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
          onChangeText={(text) => setUserData({ ...userData, name: text })}
          value={userData.name}
          returnKeyType="next"
          onSubmitEditing={() => usernameRef.current?.focus()}
          textContentType="username"
          onFocus={() => setError(emptyError)}
        />
        {error.name === "" ? null : (
          <Text style={Styles.errorText}>{error.name}</Text>
        )}
        <TextInput
          ref={usernameRef}
          style={Styles.inputBox}
          placeholder="Username"
          onChangeText={(text) => setUserData({ ...userData, username: text })}
          value={userData.username}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
          textContentType="username"
          onFocus={() => setError(emptyError)}
        />
        {error.username === "" ? null : (
          <Text style={Styles.errorText}>{error.username}</Text>
        )}

        <TextInput
          ref={emailRef}
          style={Styles.inputBox}
          placeholder="Email"
          onChangeText={(text) => setUserData({ ...userData, email: text })}
          value={userData.email}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          textContentType="username"
          onFocus={() => setError(emptyError)}
        />
        {error.email === "" ? null : (
          <Text style={Styles.errorText}>{error.email}</Text>
        )}

        <TextInput
          ref={passwordRef}
          placeholder="Password"
          style={Styles.inputBox}
          onChangeText={(text) => setUserData({ ...userData, password: text })}
          value={userData.password}
          returnKeyType="next"
          textContentType="password"
          secureTextEntry
          onFocus={() => setError(emptyError)}
        />
        {error.password === "" ? null : (
          <Text style={Styles.errorText}>{error.password}</Text>
        )}

        <TextInput
          ref={secondPasswordRef}
          placeholder="Re enter Password"
          style={Styles.inputBox}
          onChangeText={(text) => setPassword(text)}
          value={passwordVerify}
          returnKeyType="done"
          textContentType="password"
          secureTextEntry
          onFocus={() => setError(emptyError)}
        />
        {error.secondPassword === "" ? null : (
          <Text style={Styles.errorText}>{error.secondPassword}</Text>
        )}
      </View>
      {error.main === "" ? null : (
        <Text style={Styles.mainErrorText}>{error.main}</Text>
      )}
      <CustomButton
        onPressHandler={onSignUp}
        text={"Signup"}
        style={Styles.button}
      />
      <View style={Styles.altTextContainer}>
        <Text style={Styles.altText}>I have an account!</Text>
        <Text
          onPress={() => {
            navigation.navigate("Signin");
          }}
          style={Styles.altTextBlue}
        >
          Sign In
        </Text>
      </View>
    </KeyboardDismiss>
  );
};

export default Signup;
