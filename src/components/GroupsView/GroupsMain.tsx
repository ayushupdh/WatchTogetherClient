import React, { useEffect, useRef, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Center } from "../UtilComponents/Center";
import { useGetGroups } from "../../hooks/useGetGroups";
import { styles } from "./styles";
import { SimpleLineIcons } from "@expo/vector-icons";
import { CustomButton } from "../UtilComponents/CustomButton";
import { GroupsNavProps } from "./Navigation/GroupsTypes";
import { Modalize } from "react-native-modalize";
import { GroupOptionModal } from "./GroupOptionModal";
import { getUserGroups } from "../../utils/userdbUtils";

type GetGroupsType = {
  groups:
    | [
        {
          name: string;
          id: string;
        }
      ]
    | [];
  error: string | null;
};

export const GroupsMain = ({ navigation }: GroupsNavProps<"Your Groups">) => {
  // const { groups, error }: GetGroupsType = useGetGroups();
  const [groups, setGroups] = useState<GetGroupsType["groups"]>();

  const [groupSelected, setGroupSelected] = useState("");
  const modalizeRef = useRef<Modalize>();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const { groups, error }: GetGroupsType = await getUserGroups();
      setGroups(groups);
    });

    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }: any) => {
    const randomColor: string =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
    return (
      <View style={styles.item}>
        <View style={[styles.smallDot, { backgroundColor: randomColor }]} />
        <Text
          style={styles.groupName}
          onPress={() => {
            navigation.navigate("GroupInfo", { groupId: item.id });
          }}
        >
          {item.name}
        </Text>
        <SimpleLineIcons
          name="options-vertical"
          size={20}
          style={{ paddingHorizontal: 20 }}
          onPress={() => showModal(item.id)}
        />
      </View>
    );
  };

  const showModal = (groupID: string) => {
    setGroupSelected(groupID);
    modalizeRef.current?.open();
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
                onPressHandler={() => navigation.navigate("Create a Group")}
              />
            </View>
            <FlatList
              data={groups}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
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
        <Modalize ref={modalizeRef} adjustToContentHeight={true}>
          <GroupOptionModal />
        </Modalize>
      </View>
    </View>
  );
};
