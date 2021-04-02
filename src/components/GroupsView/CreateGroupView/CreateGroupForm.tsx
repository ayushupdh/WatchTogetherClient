import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { FormField } from "../FormField";
import { GroupsDataType, GroupsNavProps } from "../Navigation/GroupsTypes";
import { styles } from "../styles";
import { CustomButton } from "../../UtilComponents/CustomButton";
import { Timer } from "../../UtilComponents/Timer";
import { showAlert } from "../../UtilComponents/Alert";
import { createGroup } from "../../../utils/userdbUtils";
import { useDispatch } from "react-redux";
import {
  endGroupSession,
  startGroupSession,
  updateParams,
} from "../../../redux/actions/sessionAction";
import { store } from "../../../redux/store";
import {
  END_SESSION,
  START_SESSION,
  UPDATE_PARAMS,
} from "../../../redux/types/SessionTypes";
export const CreateGroupForm = ({
  navigation,
  route,
}: GroupsNavProps<"Create a Group">) => {
  const groupData: GroupsDataType = {
    genres: [
      "Drama",
      "Crime",
      "Comedy",
      "Action",
      "Thriller",
      "Documentary",
      "Adventure",
      "Horror",
    ],
    languages: ["English", "German", "Spanish", "French", "Arabic"],
    time: "",
    providers: ["Netflix", "Hulu", "Amazon Prime"],
  };

  const [sessionRunning, setSession] = useState<boolean>();
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

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const session: any = store.getState().session;
      setSession(session.sessionRunning);
    });
    return unsubscribe;
  }, [navigation]);

  useLayoutEffect(() => {
    if (route.params?.groupName) {
      setName(route.params?.groupName);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      if (sessionRunning) {
        endGroupSession(dispatch);
      }
    });
    return unsubscribe;
  }, [sessionRunning, navigation]);

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

  const handleNext = async () => {
    if (name !== "") {
      // If session is not running: on first start
      if (!sessionRunning) {
        let groupId = route.params?.groupId;
        if (!groupId) {
          const { response, error } = await createGroup(
            name,
            `${time.min} ${time.sec}`
          );
          groupId = response;
        }
        startGroupSession(
          {
            groupID: groupId ? groupId : "",
            sessionRunning: true,
            genres: genres,
            providers: provider,
            lang: lang,
          },
          dispatch
        );
        // If session is running: user went back and wants to update params
      } else {
        updateParams(
          {
            genres: genres,
            providers: provider,
            lang: lang,
          },
          dispatch
        );
      }
      // Navigate to Add a friend regardless
      navigation.navigate("Add a Friend", {
        groupName: name,
      });
      // If the name input is empty, show the alert
    } else {
      showAlert({
        firstText: "Group Name is required",
        firstButtonText: "ok",
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", flex: 1, paddingTop: 10 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <View style={styles.createGroupContainer}>
            {!route.params?.groupName && (
              <FormField
                placeholder="Name"
                title="Group Name"
                value={name}
                onChangeHandler={(name: string) => setName(name)}
                error={error}
                autoFocus={true}
              />
            )}
            <Timer time={time} setTime={setTime} />

            <Text style={styles.groupTitle}>Select Genres</Text>
            <View style={styles.selectionContainer}>
              {groupData.genres.map((p) => (
                <SelectionButtons key={p} text={p} onSelect={handleGenre} />
              ))}
            </View>
            <View
              style={{
                paddingTop: 30,
                marginLeft: 20,
                marginRight: 20,
                flex: 1,
              }}
            ></View>
            <Text style={styles.groupTitle}>Select Languages</Text>

            <View style={styles.selectionContainer}>
              {groupData.languages.map((p) => (
                <SelectionButtons key={p} text={p} onSelect={handleLang} />
              ))}
            </View>
            <View
              style={{
                paddingTop: 30,
                marginLeft: 20,
                marginRight: 20,
                flex: 1,
              }}
            ></View>

            {/* select providers */}
            <Text style={styles.groupTitle}>Select Providers</Text>

            <View style={styles.selectionContainer}>
              {groupData.providers.map((p) => (
                <SelectionButtons key={p} text={p} onSelect={handleProvider} />
              ))}
            </View>
            <View
              style={{
                paddingTop: 30,
                marginLeft: 20,
                marginRight: 20,
                flex: 1,
              }}
            ></View>
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
        </ScrollView>
      </View>
    </View>
  );
};

type SelectionButtonPropType = {
  text: string;
  onSelect?: (text: string, value: boolean) => void;
};
const SelectionButtons = (props: any) => {
  const [state, setstate] = useState(false);
  const handler = () => {
    setstate((prev) => !prev);
    props.onSelect(props.text, !state);
  };
  return (
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
      }}
      onPressHandler={handler}
      textStyle={{ color: state ? "white" : "black" }}
    />
  );
};
