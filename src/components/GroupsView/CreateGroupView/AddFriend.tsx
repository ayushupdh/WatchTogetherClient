import React, { useRef, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FlatList, Image, Text, View } from "react-native";
import { FormField } from "../FormField";
import { styles } from "../styles";
import { CustomButton } from "../../UtilComponents/CustomButton";
import { GroupsNavProps } from "../Navigation/GroupsTypes";
import { ModalDropDown } from "../../UtilComponents/ModalDropDown";
import {
  addUserToGroup,
  removeUserFromGroup,
  searchFriends,
} from "../../../utils/userdbUtils";
import { TouchableWithoutFeedback } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { showAlert } from "../../UtilComponents/Alert";
import { useSelector } from "react-redux";

type UserType = { name: string; _id: string; avatar: string };

export const AddFriend = ({
  route,
  navigation,
}: GroupsNavProps<"Add a Friend">) => {
  const [modal, showModal] = useState(false);
  const [input, setInput] = useState<string>("");
  const groupID = useSelector(
    ({ session }: { session: { groupID: string } }) => session.groupID
  );
  const [fetchedFriendList, setFetchedFriendsList] = useState<
    UserType[] | null
  >(null);
  const [displayedFriends, setDisplayedFriends] = useState<UserType[]>([]);

  const addFriendsToGroup = async (selectedUser: UserType) => {
    showModal(false);

    // check if the user is present in the displayed friends list
    let isPresent = displayedFriends?.findIndex(
      (user) => selectedUser._id === user._id
    );
    // If not present, update the list
    if (isPresent === -1) {
      setDisplayedFriends((oldList) => [...oldList, selectedUser]);
      // add in DB
      await addUserToGroup(groupID, selectedUser._id);
    }
  };

  const showUsers = async () => {
    const { response, error } = await searchFriends(input);
    setFetchedFriendsList(response);

    if (input !== "") {
      showModal(true);
    }
  };
  const handleRemoveFriends = async (friendsID: string) => {
    setDisplayedFriends((oldList) =>
      oldList.filter((list) => list._id !== friendsID)
    );
    await removeUserFromGroup(groupID, friendsID);
  };

  const displayFriendsList = () => {
    return displayedFriends.map((friend) => {
      return (
        <View key={friend._id} style={styles.friendsNotjoined}>
          {friend.avatar && friend.avatar !== "" ? (
            <Image
              source={{ uri: friend.avatar }}
              style={{ width: 30, height: 30, borderRadius: 20 }}
            />
          ) : (
            <Ionicons name="person-circle-sharp" size={30} color="black" />
          )}
          <Text style={styles.friendsName}>{friend.name}</Text>
          <MaterialIcons
            style={{ alignSelf: "center" }}
            onPress={() => handleRemoveFriends(friend._id)}
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
            value={input}
            onChangeHandler={(e) => {
              if (input === "") {
                showModal(false);
              }
              setInput(e);
            }}
            onSubmitEditing={(e) => showUsers()}
            error=""
            returnKeyType="search"
            autoFocus={true}
          />

          {modal && (
            <View style={{ zIndex: 1 }}>
              <ModalDropDown
                data={fetchedFriendList}
                onClick={addFriendsToGroup}
              />
            </View>
          )}

          <Text style={{ fontSize: 15, color: "#767676", paddingVertical: 5 }}>
            {displayedFriends && displayedFriends.length === 0
              ? "Add friends to the group"
              : "Waiting for friends to join..."}
          </Text>
          <View style={styles.hundredpercenContainer}>
            {/* <FlatList
              data={addedFriends}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
            /> */}
            {displayFriendsList()}
          </View>
          <CustomButton
            text="Start"
            style={[
              styles.unsubmittedButton,
              displayedFriends.length > 0 ? { opacity: 1 } : null,
            ]}
            onPressHandler={() => {
              if (displayedFriends.length > 0) {
                navigation.navigate("SwipingView", {
                  groupName: route.params?.groupName,
                });
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
