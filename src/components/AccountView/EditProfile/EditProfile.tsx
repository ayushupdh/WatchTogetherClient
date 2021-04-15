import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";
import { Text, View, Image, ActivityIndicator, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AuthPayload, LOAD_USER } from "../../../redux/types/Authtypes";
import {
  changeUserInfo,
  changeUserProfile,
  loadUser,
} from "../../../utils/userdbUtils";
import { FormField } from "../../GroupsView/FormField";
import { showAlert } from "../../UtilComponents/Alert";
import { CustomButton } from "../../UtilComponents/CustomButton";
import { Styles } from "./EditProfile.styles";
import { AccountNavProps } from "../Navigation/AccountTypes";
import { KeyboardDismiss } from "../../UtilComponents/KeyboardDismiss";

export const EditProfile = ({
  navigation,
}: AccountNavProps<"Edit Profile">) => {
  const user = useSelector(
    ({ auth }: { auth: { user: AuthPayload } }) => auth.user
  );
  const dispatch = useDispatch();

  const [userState, setUserState] = useState<AuthPayload>({
    _id: "",
    email: "",
    name: "",
    user_status: "",
    username: "",
    avatar: "",
  });

  const [error, setError] = useState({
    nameError: "",
    emailError: "",
    usernameError: "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry we need camera roll permission!");
      }
    })();
  }, []);

  useEffect(() => {
    setUserState(user);
  }, [user]);

  const goBack = async () => {
    const { user, error } = await loadUser();
    if (user) {
      dispatch({
        type: LOAD_USER,
        payload: {
          user: user[0],
          token: user[1],
        },
      });
    }

    navigation.navigate("Your Account");
  };

  const changeAvatar = async (newAvatar: ImageManipulator.ImageResult) => {
    if (newAvatar) {
      setLoading(true);
      const fetched = await changeUserProfile({
        uri: newAvatar?.uri,
      });
      if (fetched.error) {
        showAlert({ firstText: "Error changing", firstButtonText: "Ok" });
      }
      setLoading(false);
      await goBack();
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.cancelled) {
      let resizedImage = await ImageManipulator.manipulateAsync(result.uri, [
        { resize: { width: 500, height: 500 } },
      ]);
      changeAvatar(resizedImage);
    }
  };

  const setUserInfo = async (
    email: string | undefined,
    username: string | undefined,
    name: string | undefined
  ) => {
    setLoading(true);
    // Check if anything has changed

    // Send to backend
    const { response, error } = await changeUserInfo(name, username, email);
    // Finished
    setLoading(false);

    // If error from backend
    if (error) {
      // Username error -> Show Alert
      if (error.usernameError) {
        showAlert({ firstText: error.usernameError, firstButtonText: "OK" });
        return setError({ ...error, usernameError: error.usernameError });
      }
      // Email error -> Show Alert
      if (error.emailError) {
        showAlert({ firstText: error.emailError, firstButtonText: "OK" });
        return setError({ ...error, emailError: error.emailError });
      }
      // Any other error -> Show Alert
      showAlert({ firstText: error, firstButtonText: "OK" });
    } else {
      // If everything is okay -> go back
      await goBack();
    }
  };

  const onUpdate = () => {
    if (userState.name === "") {
      return setError({ ...error, nameError: "Name cannot be blank" });
    }
    if (userState.email === "") {
      return setError({ ...error, emailError: "Email is Required" });
    }
    if (userState.username === "") {
      return setError({ ...error, usernameError: "Username is Required" });
    }
    let name = userState.name === user.name ? undefined : userState.name;
    let username =
      userState.username === user.username ? undefined : userState.username;
    let email = userState.email === user.email ? undefined : userState.email;
    if (!email && !username && !name) {
      showAlert({
        firstText: "No change was made",
        firstButtonText: "Ok",
      });
    } else {
      showAlert({
        firstText: "Are you sure?",
        secondText: "This will update your profile.",
        firstButtonText: "Yes",
        secondButtonText: "Cancel",
        secondButtonHandleClose: () => null,
        firstButtonHandleClose: () => setUserInfo(email, username, name),
      });
    }
  };
  return (
    <KeyboardDismiss>
      {/* <View style={Styles.container}> */}
      {loading && (
        <View style={Styles.spinnerConatiner}>
          <ActivityIndicator
            size="large"
            color={"#313B68"}
            style={Styles.spinner}
          />
        </View>
      )}
      <Pressable style={Styles.imageContainer} onPress={pickImage}>
        {user && user.avatar ? (
          <Image
            resizeMode="contain"
            style={Styles.avatar}
            source={{ uri: user.avatar }}
          />
        ) : (
          <FontAwesome
            name="user-circle-o"
            style={Styles.avatar}
            size={110}
            color="black"
          />
        )}
        <Text onPress={pickImage} style={Styles.changeText}>
          Change Photo
        </Text>
      </Pressable>
      <FormField
        containerStyle={{ width: "80%" }}
        textInputStyle={Styles.textInput}
        titleStyle={Styles.title}
        title="Name"
        placeholder="Name"
        value={userState.name || ""}
        onChangeHandler={(name) => {
          setError({ ...error, nameError: "" });
          setUserState({ ...userState, name });
        }}
        error={error.nameError}
      />

      <FormField
        containerStyle={{ width: "80%" }}
        textInputStyle={Styles.textInput}
        titleStyle={Styles.title}
        title="Email"
        placeholder="Email"
        value={userState.email || ""}
        onChangeHandler={(email) => {
          setError({ ...error, emailError: "" });
          setUserState({ ...userState, email });
        }}
        error={error.emailError}
      />
      <FormField
        containerStyle={{ width: "80%" }}
        textInputStyle={Styles.textInput}
        titleStyle={Styles.title}
        title="Username"
        placeholder="Username"
        value={userState.username || ""}
        onChangeHandler={(username) => {
          setError({ ...error, usernameError: "" });
          setUserState({ ...userState, username });
        }}
        error={error.usernameError}
      />
      <CustomButton
        style={{ ...Styles.button, paddingBottom: 15 }}
        text="Update"
        onPressHandler={onUpdate}
      />
    </KeyboardDismiss>
  );
};
