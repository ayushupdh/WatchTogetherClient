import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View, ScrollView } from "react-native";
import { FormField } from "../FormField";
import { styles } from "../styles";
import { CustomButton } from "../../UtilComponents/CustomButton";
import { GroupsNavProps } from "../Navigation/GroupsTypes";
import { ModalDropDown } from "../../UtilComponents/ModalDropDown";
import {
  addUserToGroup,
  getGroupUsers,
  removeUserFromGroup,
  searchFriends,
} from "../../../utils/userdbUtils";
import { showAlert } from "../../UtilComponents/Alert";
import { useSelector } from "react-redux";
import { Modalize } from "react-native-modalize";
import { UserViewModal } from "../../UserViewModal/FriendViewModal";
import { UserAvatar } from "../../UserViewModal/UserAvatar";
import { socketClient } from "../../io/io";

type UserType = { name: string; _id: string; avatar: string };
type DisplayUser = { online?: boolean } & UserType;

export const AddFriend = ({
  route,
  navigation,
}: GroupsNavProps<"Add a Friend">) => {
  const [modal, showModal] = useState(false);
  const [input, setInput] = useState<string>("");
  const [clickedUser, setUser] = useState<string>("");
  const groupID = useSelector(
    ({ session }: { session: { groupID: string } }) => session.groupID
  );
  const userID = useSelector(
    ({ auth }: { auth: { user: { _id: string } } }) => auth.user._id
  );
  const [fetchedFriendList, setFetchedFriendsList] = useState<
    UserType[] | null
  >(null);
  const [displayedFriends, setDisplayedFriends] = useState<DisplayUser[]>([]);

  useLayoutEffect(() => {
    if (groupID) {
      (async () => {
        const { response, error } = await getGroupUsers(groupID);
        if (response && response.length > 0) {
          let users = response.filter((user) => {
            return user._id !== userID;
          });
          setDisplayedFriends(users);
        }
      })();
    }
  }, [groupID]);

  useEffect(() => {
    socketClient.on("user-joined", (joinedID) => {
      changeUserList(joinedID);
    });
    return () => {
      socketClient.off("user-joined");
    };
  }, [displayedFriends]);
  // For userModals
  const modalRef = useRef<Modalize>();

  const changeUserList = (joinedID: string) => {
    let newList: DisplayUser[] = displayedFriends.map((friend) => {
      if (friend._id === joinedID) {
        friend.online = true;
      }
      return friend;
    });
    setDisplayedFriends((prev: DisplayUser[]) => {
      return prev === newList ? prev : newList;
    });
  };
  const showUserModal = (id: string) => {
    setUser(id);
    modalRef.current?.open();
  };
  const handleModalClose = async () => {
    const { response, error } = await getGroupUsers(groupID);
    if (response && response.length > 0) {
      let users = response.filter((user) => {
        return user._id !== userID;
      });
      setDisplayedFriends(users);
    }
    modalRef.current?.close();
  };

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
        <Pressable
          onPress={() => showUserModal(friend._id)}
          key={friend._id}
          style={friend.online ? styles.friendsjoined : styles.friendsNotjoined}
        >
          <UserAvatar avatar={friend.avatar} size={30} borderRadius={20} />
          <Text style={styles.friendsName}>{friend.name}</Text>
          <MaterialIcons
            style={{ alignSelf: "center" }}
            onPress={() => handleRemoveFriends(friend._id)}
            name="cancel"
            size={24}
            color="#aaa"
          />
        </Pressable>
      );
    });
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={() => showModal(false)}>
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
      <UserViewModal
        modalRef={modalRef}
        userID={clickedUser}
        closeModal={handleModalClose}
      />
    </Pressable>
  );
};
