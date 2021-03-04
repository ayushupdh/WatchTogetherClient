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

// TO DO:
// create more refs to jump after name -> username -> email ->password
// Check for same password
//

const Signup = ({ navigation }: AuthNavProps<"Signup">) => {
  const [userData, setUserData] = useState<UserData>({
    username: "",
    password: "",
    email: "",
    name: "",
  });
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
      setError("Singup Failed");
      return null;
    }
  };

  const [error, setError] = useState("");
  const passwordRef: any = useRef();

  const onSignUp = () => {
    if (
      userData.username === "" ||
      userData.password === "" ||
      userData.email === "" ||
      userData.name === ""
    ) {
      setError("All the fields are required for signing up!");
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
          onSubmitEditing={() => passwordRef.current?.focus()}
          textContentType="username"
        />
        <TextInput
          style={Styles.inputBox}
          placeholder="Username"
          onChangeText={(text) => setUserData({ ...userData, username: text })}
          value={userData.username}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          textContentType="username"
        />
        <TextInput
          style={Styles.inputBox}
          placeholder="Email"
          onChangeText={(text) => setUserData({ ...userData, email: text })}
          value={userData.email}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          textContentType="username"
        />
        <TextInput
          ref={passwordRef}
          placeholder="Password"
          style={Styles.inputBox}
          onChangeText={(text) => setUserData({ ...userData, password: text })}
          value={userData.password}
          returnKeyType="done"
          textContentType="password"
          secureTextEntry
        />
      </View>
      {error === "" ? null : <Text style={Styles.errorText}>{error}</Text>}
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
