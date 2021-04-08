import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import {
  Text,
  View,
  StyleSheet,
  Button,
  StatusBar,
  Alert,
  Pressable,
} from "react-native";
import { GroupsNavProps } from "./Navigation/GroupsTypes";

import { styles } from "./styles";
import { SwipeCard } from "../SwipeCard/SwipeCard";
import { useDispatch } from "react-redux";
import { END_SESSION } from "../../redux/types/SessionTypes";
import { endSingleSession } from "../../redux/actions/sessionAction";
import { socketClient } from "../io/io";
import { Modalize } from "react-native-modalize";
import { CustomButton } from "../UtilComponents/CustomButton";

export const SwipingView = ({
  route,
  navigation,
}: GroupsNavProps<"SwipingView">) => {
  const dispatch = useDispatch();
  const [movieFinish, setMovieFinish] = useState(false);
  const modalizeRef = useRef<Modalize>();
  const handleMovieFinish = () => {
    setMovieFinish(true);
  };
  const navigateBack = () => {
    navigation.goBack();
    if (route.params.groupName === "Single") {
      endSingleSession(dispatch);
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
      headerRight: () =>
        route.params.groupName === "Single" ? (
          <Text
            onPress={navigateBack}
            style={{ color: "blue", fontSize: 20, marginRight: 10 }}
          >
            Done
          </Text>
        ) : (
          <Entypo
            onPress={() => navigation.goBack()}
            style={{
              alignSelf: "center",
              paddingRight: 10,
            }}
            name="menu"
            size={34}
            color="black"
          />
        ),
    });
  }, [navigation]);
  // Socket listeners
  useEffect(() => {
    socketClient.on("one-movie-liked-by-all", () => {
      navigation.setOptions({
        headerRight: () => (
          <Pressable
            onPress={() => navigation.goBack()}
            style={({ pressed }) => [
              {
                marginRight: 10,
                padding: 3,
                opacity: pressed ? 0.9 : 1,
                backgroundColor: pressed ? "#ccc" : "white",
                borderRadius: 20,
              },
            ]}
          >
            <View
              style={{
                position: "absolute",
                top: 10,
                left: 5,
                zIndex: 10,
                borderRadius: 5,
                backgroundColor: "red",
                padding: 5,
              }}
            ></View>
            <Entypo
              style={{
                alignSelf: "center",
              }}
              name="menu"
              size={34}
              color="black"
            />
          </Pressable>
        ),
      });
    });
    return () => {
      socketClient.off("one-movie-liked-by-all");
    };
  }, [socketClient]);

  useEffect(() => {
    const unsubsribe = navigation.addListener("beforeRemove", (e) => {
      // Prevent default behavior of leaving the screen
      if (!movieFinish) {
        e.preventDefault();
        // Prompt the user before leaving the screen
        Alert.alert("Do you wanna exit?", "This will end the session", [
          { text: "Don't leave", style: "cancel", onPress: () => {} },
          {
            text: "Exit",
            style: "destructive",
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => {
              navigation.dispatch(e.data.action);
              navigation.popToTop();

              if (!route.params.groupName) {
                endSingleSession(dispatch);
              }
            },
          },
        ]);
      }
    });
    return unsubsribe;
  }, [navigation, movieFinish]);
  return (
    <View style={styles.container}>
      {route.params.groupName === "Single" ? null : (
        <View
          style={{
            paddingHorizontal: 10,
            marginTop: 10,
            backgroundColor: "#37BEB0",
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="time-outline" size={20} color="white" />
          <Text
            style={{
              fontSize: 20,
              color: "white",
              paddingLeft: 5,
            }}
          >
            5:00
          </Text>
        </View>
      )}

      <SwipeCard
        onMovieFinish={handleMovieFinish}
        navigateBack={navigateBack}
        groupType={route.params.groupName === "Single" ? "Single" : "Group"}
      />
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        modalStyle={{ backgroundColor: "#E2EAF4" }}
        // modalHeight={windowHeight.height - headerHeight - 100}
      >
        <View style={{ padding: 20, marginBottom: 20 }}>
          <CustomButton
            text={"Add a user"}
            textStyle={{ fontSize: 20, color: "#000" }}
            style={{
              marginVertical: 5,
              padding: 10,
              backgroundColor: "#FAFAFA",
              borderRadius: 20,
              shadowOffset: { width: 5, height: 4 },
              shadowColor: "#000",
              shadowOpacity: 0.4,
              elevation: 5,
            }}
          />
          <CustomButton
            text={"Leave Group"}
            textStyle={{ fontSize: 20 }}
            onPressHandler={navigateBack}
            style={{
              marginVertical: 5,
              padding: 10,
              backgroundColor: "red",
              borderRadius: 20,
              shadowOffset: { width: 5, height: 4 },
              shadowColor: "#000",
              shadowOpacity: 0.4,
              elevation: 5,
            }}
          />
        </View>
      </Modalize>
    </View>
  );
};
