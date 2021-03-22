import React, { useRef, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FlatList, Text, View } from "react-native";
import { FormField } from "../FormField";
import { styles } from "../styles";
import { CustomButton } from "../../dumbComponents/CustomButton";
import { GroupsNavProps } from "../Navigation/GroupsTypes";
import { ModalDropDown } from "../../dumbComponents/ModalDropDown";
import { searchFriends } from "../../../utils/userdbUtils";
import { TouchableWithoutFeedback } from "react-native";

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
    let isPresent = addedFriends?.findIndex(
      (user) => selectedUser._id === user._id
    );
    if (isPresent === -1) {
      setAddedFriends((oldList) => [...oldList, selectedUser]);
    }
    showModal(false);
  };

  const showUsers = async () => {
    const { response, error } = await searchFriends(friend);
    setFriendList(response);

    if (friend !== "") {
      showModal(true);
    }
  };

  const renderItem = ({ item }: { item: UserType }) => {
    return (
      <View key={item._id} style={styles.friendsNotjoined}>
        <Ionicons name="person-circle-sharp" size={24} color="black" />
        <Text style={styles.friendsName}>{item.name}</Text>
        <MaterialIcons
          onPress={() =>
            setAddedFriends((oldList) =>
              oldList.filter((list) => list._id !== item._id)
            )
          }
          name="cancel"
          size={24}
          color="#aaa"
        />
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1, alignItems: "center" }}
      onPress={() => showModal(false)}
    >
      <View style={styles.container}>
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
          />

          {modal && (
            <View style={{ zIndex: 1 }}>
              <ModalDropDown data={friendList} onClick={addToFriendList} />
            </View>
          )}

          <Text style={{ fontSize: 15, color: "#767676" }}>
            {addedFriends && addedFriends.length === 0
              ? "Add friends to the group"
              : "Waiting for friends to join..."}
          </Text>
          <View style={styles.hundredpercenContainer}>
            <FlatList
              data={addedFriends}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
            />
          </View>
          <CustomButton
            text="Start"
            style={styles.unsubmittedButton}
            onPressHandler={() =>
              navigation.navigate("SwipingView", {
                groupName: route.params.groupName,
              })
            }
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
