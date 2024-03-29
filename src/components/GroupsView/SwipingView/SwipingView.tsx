import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import { Text, View, Alert, Pressable } from "react-native";
import { GroupsNavProps } from "../Navigation/GroupsTypes";

import { styles } from "../styles";
import { SwipeCard } from "../../SwipeCard/SwipeCard";
import { useDispatch, useSelector } from "react-redux";
import { END_SESSION } from "../../../redux/types/SessionTypes";
import {
  endGroupSession,
  endSingleSession,
  leaveGroupSession,
} from "../../../redux/actions/sessionAction";
import { socketClient } from "../../../api/io/io";
import { Modalize } from "react-native-modalize";
import { CustomButton } from "../../UtilComponents/CustomButton";
import { showAlert } from "../../UtilComponents/Alert";
import { CountDown } from "./CountDown";

export const SwipingView = ({
  route,
  navigation,
}: GroupsNavProps<"SwipingView">) => {
  const dispatch = useDispatch();

  // Get vars from redux
  const { userID, sessionID, groupID, admin } = useSelector(
    ({
      session,
      auth,
    }: {
      session: { sessionID: string; groupID: string; admin: string };
      auth: { user: { _id: string } };
    }) => {
      return {
        userID: auth.user._id,
        sessionID: session.sessionID,
        groupID: session.groupID,
        admin: session.admin,
      };
    }
  );
  // State vars
  const [movieMatched, setMovieMatched] = useState(false);
  const [movieFinish, setMovieFinish] = useState(false);
  const modalizeRef = useRef<Modalize>();
  const handleMovieFinish = () => {
    setMovieFinish(true);
  };
  // Navigate back logic based upon whether it is Single or Group View
  const navigateBack = () => {
    if (route.params.groupName === "Single") {
      navigation.popToTop();
    } else {
      if (admin && userID && sessionID && groupID) {
        if (userID === admin) {
          showAlert({
            firstText: "This will end the session for everyone",
            secondText: "Exit?",
            firstButtonText: "OK",
            secondButtonText: "Cancel",
            firstButtonHandleClose: () => {
              if (groupID && sessionID) {
                endGroupSession(groupID, sessionID, dispatch);
              }
              setTimeout(() => {
                navigation.navigate("Results", { sessionID: sessionID });
              }, 200);
            },
          });
        } else {
          showAlert({
            firstText: "Are you sure you want to leave this session?",
            firstButtonText: "Yes",
            secondButtonText: "Cancel",
            firstButtonHandleClose: async () => {
              if (groupID && sessionID) {
                leaveGroupSession(sessionID, dispatch);
                setTimeout(() => {
                  navigation.popToTop();
                }, 200);
              }
            },
          });
        }
      }
    }
  };

  const showOptionModal = () => {
    modalizeRef.current?.open();
  };
  // For top header button
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
            onPress={showOptionModal}
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
    // Remove any previous listeners if the comp is not mounted
    socketClient.off("session-ended");
    socketClient.on("one-movie-liked-by-all", () => {
      !movieMatched ? setMovieMatched(true) : null;
      navigation.setOptions({
        headerRight: () => (
          <Pressable
            onPress={showOptionModal}
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
    socketClient.on("session-ended", () => {
      dispatch({
        type: END_SESSION,
      });
      navigation.navigate("Results", { sessionID: sessionID });
    });
    return () => {
      socketClient.off("one-movie-liked-by-all");
      socketClient.off("session-ended");
    };
  }, [socketClient]);

  useEffect(() => {
    const unsubsribe = navigation.addListener("beforeRemove", (e) => {
      // Prevent default behavior of leaving the screen
      if (!movieFinish && route.params.groupName === "Single") {
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
              if (route.params.groupName) {
                endSingleSession(dispatch);
              }
            },
          },
        ]);
      }
    });
    return unsubsribe;
  }, [navigation, movieFinish]);

  const onCountDownFinish = () => {
    if (groupID && sessionID) {
      endGroupSession(groupID, sessionID, dispatch);
    }
    setTimeout(() => {
      navigation.navigate("Results", { sessionID: sessionID });
    }, 200);
  };

  return (
    <View style={styles.container}>
      {route.params.groupName === "Single" ? null : (
        <CountDown onCountDownFinish={onCountDownFinish} />
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
          {movieMatched && (
            <CustomButton
              text={"View Results"}
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
              onPressHandler={() => {
                navigation.navigate("Results", { sessionID: sessionID });
              }}
            />
          )}

          <CustomButton
            text={admin === userID ? "End Session" : "Leave Group"}
            textStyle={{ fontSize: 20 }}
            onPressHandler={() => {
              navigateBack();
            }}
            style={{
              marginVertical: 5,
              padding: 10,
              backgroundColor: "#850000",
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
