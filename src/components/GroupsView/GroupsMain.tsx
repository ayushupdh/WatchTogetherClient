import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { styles } from "./styles";
import { SimpleLineIcons } from "@expo/vector-icons";
import { CustomButton } from "../UtilComponents/CustomButton";
import { GroupsNavProps } from "./Navigation/GroupsTypes";
import { Modalize } from "react-native-modalize";
import { GroupOptionModal } from "./GroupOptionModal/GroupOptionModal";
import { getUserGroups, renameGroup } from "../../utils/userdbUtils";
import { socketClient } from "../io/io";
import { TextInput } from "react-native-gesture-handler";
import { ErrorPopup } from "../UtilComponents/ErrorPopup";

type GroupType = {
  name: string;
  _id: string;
  session_active: boolean;
  current_session?: string;
};
type GetGroupsType = {
  groups: GroupType[] | [];
  error: string | null;
};

export const GroupsMain = ({ navigation }: GroupsNavProps<"Your Groups">) => {
  const [groups, setGroups] = useState<GetGroupsType["groups"]>();
  const [groupSelected, setGroupSelected] = useState<GroupType>({
    name: "",
    _id: "",
    session_active: false,
  });
  const [renameModalOpen, setrenameModalOpen] = useState<{
    name: string;
    open: boolean;
    id: string;
  }>({ id: "", name: "", open: false });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const modalizeRef = useRef<Modalize>();

  // Refresh groups list on focus
  useEffect(() => {
    let unsubscribe1 = 1;
    const unsubscribe2 = navigation.addListener("focus", async () => {
      setLoading(true);
      const { groups, error }: GetGroupsType = await getUserGroups();
      if (error) {
        setError("Network Error");
        unsubscribe1 = setTimeout(() => {
          setError("");
        }, 2000);
        return;
      }
      setGroups(groups);
      setLoading(false);
    });

    return () => {
      unsubscribe2();
      clearTimeout(unsubscribe1);
    };
  }, [navigation]);

  useEffect(() => {
    const groupslist = groups && groups.map((group: GroupType) => group._id);
    socketClient.on("group-status-changed", async (groupID) => {
      if (groupslist && groupslist.includes(groupID)) {
        const { groups, error }: GetGroupsType = await getUserGroups();
        setGroups(groups);
      }
    });
    return () => {
      socketClient.off("group-status-changed");
    };
  }, [groups]);
  const renderGroupList = ({ item }: { item: GroupType }) => {
    const randomColor: string =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
    return (
      <View style={styles.item}>
        <View style={[styles.smallDot, { backgroundColor: randomColor }]} />
        {item.session_active && (
          <View
            style={[styles.sessionRunningDot, { backgroundColor: "green" }]}
          />
        )}
        <Text
          numberOfLines={1}
          style={styles.groupName}
          onPress={() => {
            navigation.navigate("GroupInfo", { groupId: item._id });
          }}
        >
          {item.name}
        </Text>

        <SimpleLineIcons
          name="options-vertical"
          size={20}
          style={{ paddingHorizontal: 20 }}
          onPress={() => showModal(item)}
        />
      </View>
    );
  };

  const showModal = (group: GroupType) => {
    setGroupSelected(group);
    modalizeRef.current?.open();
  };
  const closeModal = async () => {
    modalizeRef.current?.close();
    const { groups, error }: GetGroupsType = await getUserGroups();
    setGroups(groups);
  };
  const handleRename = (groupName: string, groupID: string) => {
    modalizeRef.current?.close();
    setrenameModalOpen({ id: groupID, name: groupName, open: true });
  };
  const closeRename = (newName: string) => {
    setGroups(
      (prev) =>
        prev &&
        prev.map((group: GroupType) =>
          group._id === renameModalOpen.id ? { ...group, name: newName } : group
        )
    );
    setrenameModalOpen({ id: "", name: "", open: false });
  };
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.hundredpercenContainer}>
          <ActivityIndicator
            style={{ padding: 20 }}
            size="small"
            color={"#313B68"}
          />
          <View style={styles.item}>
            <View
              style={{ backgroundColor: "#eee", padding: 15, width: "80%" }}
            ></View>
          </View>
          <View style={styles.item}>
            <View
              style={{ backgroundColor: "#eee", padding: 15, width: "80%" }}
            ></View>
          </View>
        </View>
        {error !== "" && <ErrorPopup error={error} />}
      </View>
    );
  }
  return (
    <Pressable
      onPress={() => setrenameModalOpen({ id: "", name: "", open: false })}
      style={styles.container}
    >
      <View style={styles.hundredpercenContainer}>
        {groups && groups.length !== 0 ? (
          <>
            <View style={styles.createButtonContainer}>
              <CustomButton
                text="Create a Group"
                style={styles.createButton}
                textStyle={{ fontWeight: "600" }}
                onPressHandler={() => navigation.navigate("Create a Group")}
              />
            </View>
            <FlatList
              data={groups}
              renderItem={renderGroupList}
              keyExtractor={(item) => item._id}
            />
          </>
        ) : (
          <View style={{ ...styles.container, justifyContent: "center" }}>
            <Text style={styles.customText}>
              You don't have any groups yet!
            </Text>
            <Text style={styles.customText}>Let's get started!</Text>
            <CustomButton
              text="Create a Group"
              style={{ ...styles.createButton, width: "60%", marginTop: 20 }}
              onPressHandler={() => {
                navigation.navigate("Create a Group");
              }}
            />
          </View>
        )}
      </View>
      {renameModalOpen.open && (
        <RenameModal
          groupID={renameModalOpen.id}
          groupName={renameModalOpen.name}
          close={closeRename}
        />
      )}

      <Modalize
        ref={modalizeRef}
        modalStyle={{ backgroundColor: "#E2EAF4" }}
        // adjustToContentHeight={true}
        modalHeight={190}
      >
        <GroupOptionModal
          nav={navigation}
          group={groupSelected}
          close={closeModal}
          handleRename={handleRename}
        />
      </Modalize>
    </Pressable>
  );
};

const RenameModal = ({
  groupName,
  groupID,
  close,
}: {
  groupName: string;
  groupID: string;
  close: (newName: string) => void;
}) => {
  const [state, setstate] = useState(groupName);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const height = useWindowDimensions().height;
  const changeName = async () => {
    setLoading(true);
    if (state === "") {
      setError("No name was provided.");
      return setLoading(false);
    }
    const { response, error } = await renameGroup(groupID, state);
    if (error) {
      setError(error);
      return setLoading(false);
    }
    setLoading(false);
    close(state);
  };

  return (
    <Pressable
      onPress={() => {}}
      style={{
        backgroundColor: "white",
        zIndex: 10,
        position: "absolute",
        top: height / 3,
        padding: 20,
        width: "80%",
        borderRadius: 20,
        shadowOffset: { width: 5, height: 4 },
        shadowColor: "#000",
        shadowOpacity: 0.4,
        marginVertical: 5,
        elevation: 5,
      }}
    >
      <Text>Set New Name for the Group</Text>
      <TextInput
        style={{
          padding: 10,
          borderBottomColor: "#313B68",
          borderBottomWidth: 1,

          fontSize: 20,
        }}
        placeholder={"Enter new group name"}
        value={state}
        onChangeText={(text) => {
          error !== "" && setError("");
          setstate(text);
        }}
        returnKeyType="done"
        autoFocus={true}
      />
      {error !== "" && (
        <Text
          style={{
            color: "red",
            padding: 8,
            alignSelf: "center",
          }}
        >
          {error}
        </Text>
      )}
      <Pressable
        onPress={changeName}
        style={{
          alignItems: "center",
          padding: 8,
          backgroundColor: "#313B68",
          borderRadius: 20,
          marginVertical: 10,
        }}
      >
        {loading ? (
          <ActivityIndicator color={"#313B68"} />
        ) : (
          <Text style={{ fontSize: 20, color: "#fff" }}>Done</Text>
        )}
      </Pressable>
    </Pressable>
  );
};
