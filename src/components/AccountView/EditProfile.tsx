import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";

import React, { useEffect, useState } from "react";
import { Text, View, Image, ActivityIndicator, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { AuthPayload } from "../../redux/types/Authtypes";
import { changeUserInfo } from "../../utils/userdbUtils";
import { FormField } from "../GroupsView/FormField";
import { showAlert } from "../UtilComponents/Alert";
import { CustomButton } from "../UtilComponents/CustomButton";
import { Styles } from "./EditProfile.style";
import { AccountNavProps } from "./Navigation/AccountTypes";

type UserStateType = {
  avatar?: string;
} & AuthPayload;

export const EditProfile = ({
  navigation,
}: AccountNavProps<"Edit Profile">) => {
  const user = useSelector(
    ({ auth }: { auth: { user: AuthPayload } }) => auth.user
  );
  const [userState, setUserState] = useState<UserStateType>({
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.cancelled) {
      let resizedImage = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: { width: 500, height: 500 } }],
        { base64: true }
      );
      let imageBased64 = resizedImage.base64 ?? "";
      setUserState({ ...userState, avatar: imageBased64 });
    }
  };

  const setUserInfo = async () => {
    setLoading(true);
    let name = userState.name === user.name ? undefined : userState.name;
    let username =
      userState.username === user.username ? undefined : userState.username;
    let email = userState.email === user.email ? undefined : userState.email;

    const { response, error } = await changeUserInfo(name, username, email);
    setLoading(false);
    if (error) {
      if (error.usernameError) {
        showAlert({ firstText: error.usernameError, firstButtonText: "OK" });
        return setError({ ...error, usernameError: error.usernameError });
      }
      if (error.emailError) {
        showAlert({ firstText: error.emailError, firstButtonText: "OK" });
        return setError({ ...error, emailError: error.emailError });
      }
      showAlert({ firstText: error, firstButtonText: "OK" });
    } else {
      navigation.navigate("Your Account");
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
    showAlert({
      firstText: "Are you sure?",
      secondText: "This will update your profile.",
      firstButtonText: "Yes",
      secondButtonText: "Cancel",
      secondButtonHandleClose: () => null,
      firstButtonHandleClose: setUserInfo,
    });
  };

  return (
    <View style={Styles.container}>
      {loading && (
        <View style={Styles.spinnerConatiner}>
          <ActivityIndicator size="large" color="#000" style={Styles.spinner} />
        </View>
      )}
      <Pressable style={Styles.imageContainer} onPress={pickImage}>
        {userState.avatar && userState.avatar !== "" ? (
          <Image
            style={Styles.avatar}
            source={{ uri: "data:image/jpeg;base64," + userState.avatar }}
          />
        ) : (
          <Image style={Styles.avatar} source={require("./avatar.png")} />
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
        style={Styles.button}
        text="Update"
        onPressHandler={onUpdate}
      />
    </View>
  );
};
