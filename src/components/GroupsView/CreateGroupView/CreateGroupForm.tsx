import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { FormField } from "../FormField";
import { GroupsDataType, GroupsNavProps } from "../Navigation/GroupsTypes";
import { styles } from "../styles";
import { CustomButton } from "../../UtilComponents/CustomButton";
import { Timer } from "../../UtilComponents/Timer";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { showAlert } from "../../UtilComponents/Alert";
import { createGroup } from "../../../utils/userdbUtils";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../../redux/store";
import {
  END_SESSION,
  START_SESSION,
  UPDATE_PARAMS,
} from "../../../redux/types/SessionTypes";
export const CreateGroupForm = ({
  navigation,
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

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      if (sessionRunning) {
        dispatch({
          type: END_SESSION,
        });
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
      if (!sessionRunning) {
        const { response, error } = await createGroup(
          name,
          `${time.min} ${time.sec}`
        );
        dispatch({
          type: START_SESSION,
          payload: {
            sessionType: "Group",
            groupID: response,
            sessionRunning: true,
            genres: genres,
            providers: provider,
            lang: lang,
          },
        });
      } else {
        dispatch({
          type: UPDATE_PARAMS,
          payload: {
            genres: genres,
            providers: provider,
            lang: lang,
          },
        });
      }
      navigation.navigate("Add a Friend", {
        groupName: name,
      });
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
            <FormField
              placeholder="Name"
              title="Group Name"
              value={name}
              onChangeHandler={(name: string) => setName(name)}
              error={error}
              autoFocus={true}
            />
            <Timer time={time} setTime={setTime} />

            {/* select genres */}
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
            {/* select Lang */}
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
        backgroundColor: state ? "#F78473" : "#f4f4f4",
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
