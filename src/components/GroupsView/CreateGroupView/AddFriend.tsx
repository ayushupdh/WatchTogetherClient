import React, { useRef, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FlatList, Text, View } from "react-native";
import { FormField } from "../FormField";
import { styles } from "../styles";
import { CustomButton } from "../../UtilComponents/CustomButton";
import { GroupsNavProps } from "../Navigation/GroupsTypes";
import { ModalDropDown } from "../../UtilComponents/ModalDropDown";
import { createGroup, searchFriends } from "../../../utils/userdbUtils";
import { TouchableWithoutFeedback } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { showAlert } from "../../UtilComponents/Alert";

type UserType = { name: string; _id: string };

export const AddFriend = ({
  route,
  navigation,
}: GroupsNavProps<"Add a Friend">) => {
  const [modal, showModal] = useState(false);
  const [friend, setFriend] = useState<string>("");
  const [friendList, setFriendList] = useState<UserType[] | null>(null);
  const [addedFriends, setAddedFriends] = useState<UserType[]>([]);

  const addToFriendList = (selectedUser: UserType) => {
    showModal(false);

    let isPresent = addedFriends?.findIndex(
      (user) => selectedUser._id === user._id
    );
    if (isPresent === -1) {
      setAddedFriends((oldList) => [...oldList, selectedUser]);
    }
  };

  const showUsers = async () => {
    const { response, error } = await searchFriends(friend);
    setFriendList(response);

    if (friend !== "") {
      showModal(true);
    }
  };

  const render = () => {
    return addedFriends.map((friend) => {
      return (
        <View key={friend._id} style={styles.friendsNotjoined}>
          <Ionicons name="person-circle-sharp" size={24} color="black" />
          <Text style={styles.friendsName}>{friend.name}</Text>
          <MaterialIcons
            onPress={() =>
              setAddedFriends((oldList) =>
                oldList.filter((list) => list._id !== friend._id)
              )
            }
            name="cancel"
            size={24}
            color="#aaa"
          />
        </View>
      );
    });
  };

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1, alignItems: "center" }}
      onPress={() => showModal(false)}
    >
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={{ flex: 1, backgroundColor: "#E2EAF4" }}
      >
        <View style={styles.eightypercenContainer}>
          <FormField
            title="Add a Friend"
            placeholder="Username or Email"
            value={friend}
            onChangeHandler={(e) => {
              if (friend === "") {
                showModal(false);
              }
              setFriend(e);
            }}
            onSubmitEditing={(e) => showUsers()}
            error=""
            returnKeyType="search"
            autoFocus={true}
          />

          {modal && (
            <View style={{ zIndex: 1 }}>
              <ModalDropDown data={friendList} onClick={addToFriendList} />
            </View>
          )}

          <Text style={{ fontSize: 15, color: "#767676", paddingVertical: 5 }}>
            {addedFriends && addedFriends.length === 0
              ? "Add friends to the group"
              : "Waiting for friends to join..."}
          </Text>
          <View style={styles.hundredpercenContainer}>
            {/* <FlatList
              data={addedFriends}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
            /> */}
            {render()}
          </View>
          <CustomButton
            text="Start"
            style={[
              styles.unsubmittedButton,
              addedFriends.length > 0 ? { opacity: 1 } : null,
            ]}
            onPressHandler={() => {
              if (addedFriends.length > 0) {
                navigation.navigate("SwipingView", {
                  groupName: route.params.groupName,
                });
                createGroup(route.params.groupName, "00 00");
              } else {
                showAlert({
                  firstText: "Need atleast one friend to start a group session",
                  firstButtonText: "ok",
                });
              }
            }}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};
