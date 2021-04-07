import React, { useEffect, useRef, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { styles } from "./styles";
import { SimpleLineIcons } from "@expo/vector-icons";
import { CustomButton } from "../UtilComponents/CustomButton";
import { GroupsNavProps } from "./Navigation/GroupsTypes";
import { Modalize } from "react-native-modalize";
import { GroupOptionModal } from "./GroupOptionModal/GroupOptionModal";
import { getUserGroups } from "../../utils/userdbUtils";

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
  const modalizeRef = useRef<Modalize>();

  // Refresh groups list on focus
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const { groups, error }: GetGroupsType = await getUserGroups();
      setGroups(groups);
    });

    return unsubscribe;
  }, [navigation]);

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

  return (
    <View style={styles.container}>
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
        />
      </Modalize>
    </View>
  );
};
