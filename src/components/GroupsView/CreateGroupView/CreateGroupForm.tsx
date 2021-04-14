import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import { FormField } from "../FormField";
import { GroupsDataType, GroupsNavProps } from "../Navigation/GroupsTypes";
import { styles } from "../styles";
import { CustomButton } from "../../UtilComponents/CustomButton";
import { Timer } from "../../UtilComponents/Timer";
import { showAlert } from "../../UtilComponents/Alert";
import { createGroup } from "../../../utils/userdbUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  endGroupSession,
  leaveGroupSession,
  startGroupSession,
  updateParams,
} from "../../../redux/actions/sessionAction";
import { socketClient } from "../../io/io";
import {
  END_SESSION,
  UPDATE_SWIPING,
  UPDATE_TIME,
} from "../../../redux/types/SessionTypes";

export const CreateGroupForm = ({
  navigation,
  route,
}: GroupsNavProps<"Create a Group">) => {
  const groupData: GroupsDataType = {
    genres: [
      "Action",
      "Adventure",
      "Comedy",
      "Crime",
      "Documentary",
      "Drama",
      "Fantasy",
      "Horror",
      "Mystery",
      "Romance",
      "Science Fiction",
      "Thriller",
    ],
    languages: [
      "English",
      "German",
      "French",
      "Spanish",
      "Italian",
      "Russian",
      "Japanese",
    ],
    time: "",
    providers: [
      "DIRECTV",
      "HBO Max",
      "fuboTV",
      "Amazon Prime Video",
      "HBO Now",
      "Pluto TV",
      "Hulu",
      "Netflix",
      "Amazon Prime",
      "Disney Plus",
    ],
  };
  const {
    sessionRunning,
    sessionID,
    admin,
    groupID,
    time_rx,
    swipingActive,
  } = useSelector(
    ({
      session,
    }: {
      session: {
        sessionRunning: boolean;
        sessionID: string;
        admin: string;
        groupID: string;
        swipingActive: string;
        sessionParams: { time: number };
      };
    }) => {
      return {
        sessionRunning: session.sessionRunning,
        sessionID: session.sessionID,
        admin: session.admin,
        groupID: session.groupID,
        swipingActive: session.swipingActive,
        time_rx: session.sessionParams.time,
      };
    }
  );
  const userID = useSelector(
    ({ auth }: { auth: { user: { _id: string } } }) => auth.user._id
  );
  // const [sessionRunning, setSession] = useState<boolean>();
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [time, setTime] = useState<{ min: string; sec: string }>({
    min: "00",
    sec: "00",
  });
  const [genres, setGenres] = useState<string[]>([]);
  const [lang, setLang] = useState<string[]>([]);
  const [provider, setProvider] = useState<string[]>([]);
  const [error, seterror] = useState<string>("");
  // Set time
  useEffect(() => {
    if (time_rx) {
      let sMin = Math.floor(time_rx / 60);
      let sSec = time_rx - sMin * 60;
      setTime({ min: ("0" + sMin).slice(-2), sec: ("0" + sSec).slice(-2) });
    }
  }, [time_rx]);

  useLayoutEffect(() => {
    if (route.params?.groupName) {
      setName(route.params?.groupName);
    }
  }, []);
  // Socket Listeners
  useEffect(() => {
    socketClient.on("session-ended", () => {
      dispatch({
        type: END_SESSION,
      });
      navigation.popToTop();
    });
    socketClient.on("session-started", (time) => {
      dispatch({
        type: UPDATE_SWIPING,
        payload: { started_time: time, swipingActive: true },
      });
    });
    socketClient.on("time-updated", (time) => {
      dispatch({
        type: UPDATE_TIME,
        payload: { time: time },
      });
    });
    return () => {
      socketClient.off("session-ended");
      socketClient.off("session-started");
      socketClient.off("time-updated");
    };
  }, [socketClient, navigation]);

  // Listeners for going back
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      if (sessionRunning) {
        if (admin === userID) {
          e.preventDefault();
          showAlert({
            firstText: "This will end the session",
            secondText: "Exit?",
            firstButtonText: "OK",
            secondButtonText: "Cancel",
            firstButtonHandleClose: () => {
              navigation.dispatch(e.data.action);
              endGroupSession(
                route.params?.groupId ? route.params?.groupId : groupID,
                route.params?.sessionID ? route.params?.sessionID : sessionID,
                dispatch
              );
            },
          });
        } else {
          leaveGroupSession(
            route.params?.sessionID ? route.params?.sessionID : sessionID,
            dispatch
          );
        }
      }
    });
    return unsubscribe;
  }, [sessionRunning, navigation]);

  const parseTime = () => {
    let Nmin = parseInt(time.min, 10) | 0;
    let NSec = parseInt(time.sec, 10) | 0;
    return Nmin * 60 + NSec;
  };

  // State updates
  const handleGenre = (text: string, value: boolean) => {
    if (value) {
      setGenres((prev) => prev.concat(text));
    } else {
      setGenres((prev) => prev.filter((el) => el !== text));
    }
  };
  const handleLang = (text: string, value: boolean) => {
    if (value) {
      setLang((prev) => prev.concat(text));
    } else {
      setLang((prev) => prev.filter((el) => el !== text));
    }
  };
  const handleProvider = (text: string, value: boolean) => {
    if (value) {
      setProvider((prev) => prev.concat(text));
    } else {
      setProvider((prev) => prev.filter((el) => el !== text));
    }
  };

  //Main function to start session/ update params
  const handleNext = async () => {
    // If the groupname is set
    if (name !== "") {
      // If session is not running i.e. on first start
      if (!sessionRunning) {
        // Get groupId from routes
        let groupId = route.params?.groupId;
        // If the component does not get groupID from GroupOptionModal i.e: Creating a Group
        // ->Create a Group
        if (!groupId) {
          const { response, error } = await createGroup(name, parseTime());
          groupId = response;
        }
        // !Call startGroupSession action creator that changes redux and emits with io
        startGroupSession(
          {
            groupID: groupId ? groupId : "",
            sessionRunning: true,
            genres: genres,
            providers: provider,
            lang: lang,
            time: parseTime(),
          },
          dispatch
        );
        navigation.navigate("Add a Friend", {
          groupName: name,
        });
        // If session is running: user went back and wants to update params
      } else {
        updateParams(
          route.params?.sessionID ? route.params?.sessionID : sessionID,
          {
            time: !admin || admin === userID ? parseTime() : time_rx,
            genres: genres,
            providers: provider,
            lang: lang,
          },
          dispatch
        );
        if (swipingActive) {
          navigation.navigate("SwipingView", {
            groupName: route.params?.groupName,
          });
        } else {
          navigation.navigate("Add a Friend", {
            groupName: name,
          });
        }
      }
      // Navigate to Add a friend regardless

      // If the name input is empty, show the alert
    } else {
      showAlert({
        firstText: "Group Name is required",
        firstButtonText: "ok",
      });
    }
  };
  return (
    <View style={styles.createGroupContainer}>
      {!route.params?.groupName && (
        <FormField
          textInputStyle={styles.textinputformField}
          placeholder="Name"
          title="Group Name"
          value={name}
          onChangeHandler={(name: string) => setName(name)}
          error={error}
          autoFocus={true}
        />
      )}
      {(!admin || admin === userID) && <Timer time={time} setTime={setTime} />}
      <View style={{ flexBasis: 100, width: "100%" }}>
        <Text style={styles.groupTitle}>Select Genres</Text>
        <FlatList
          contentContainerStyle={{ marginHorizontal: 20 }}
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }: { item: string }) => (
            <SelectionButtons text={item} onSelect={handleGenre} />
          )}
          data={groupData.genres}
          keyExtractor={(item: string) => item}
          horizontal
        />
      </View>
      <View style={{ flexBasis: 100, width: "100%" }}>
        <Text style={styles.groupTitle}>Select Languages</Text>
        <FlatList
          contentContainerStyle={{ marginHorizontal: 20 }}
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }: { item: string }) => (
            <SelectionButtons text={item} onSelect={handleLang} />
          )}
          data={groupData.languages}
          keyExtractor={(item: string) => item}
          horizontal
        />
      </View>
      {/* select providers */}
      <View style={{ flexBasis: 100, width: "100%" }}>
        <Text style={styles.groupTitle}>Select Providers</Text>
        <FlatList
          contentContainerStyle={{ marginHorizontal: 20 }}
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }: { item: string }) => (
            <SelectionButtons text={item} onSelect={handleProvider} />
          )}
          data={groupData.providers}
          keyExtractor={(item: string) => item}
          horizontal
        />
      </View>

      <CustomButton
        text={"Next"}
        style={
          name === ""
            ? styles.unsubmittedButton
            : { ...styles.unsubmittedButton, opacity: 1 }
        }
        onPressHandler={handleNext}
      />
    </View>
  );
};

type SelectionButtonPropType = {
  text: string;
  onSelect: (text: string, value: boolean) => void;
};
const SelectionButtons = (props: SelectionButtonPropType) => {
  const [state, setstate] = useState(false);
  const handler = () => {
    setstate((prev) => !prev);
    props.onSelect(props.text, !state);
  };
  return (
    <View>
      <CustomButton
        text={props.text}
        style={{
          paddingHorizontal: 15,
          paddingVertical: 5,
          backgroundColor: state ? "#37BEB0" : "#f4f4f4",
          marginHorizontal: 8,
          marginVertical: 8,
          borderRadius: 20,
          shadowOffset: { width: 5, height: 4 },
          shadowColor: "#000",
          shadowOpacity: 0.4,
          elevation: 5,
        }}
        onPressHandler={handler}
        textStyle={{ color: state ? "white" : "black" }}
      />
    </View>
  );
};
