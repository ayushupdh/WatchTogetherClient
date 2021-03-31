import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { Modalize } from "react-native-modalize";
import { getOtherUsersInfo, removeFriend } from "../../utils/userdbUtils";
import { AddFriendModal } from "./AddFriendModal";
import { CustomButton } from "../UtilComponents/CustomButton";
import { UserAvatar } from "./UserAvatar";
import { showAlert } from "../UtilComponents/Alert";

type UserType = {
  name: string;
  avatar?: string;
  _id: string;
  username: string;
  isFriend: boolean;
  groups?: number;
  liked_movies?: number;
};

type UserViewModalProps = {
  modalRef: React.MutableRefObject<Modalize | undefined>;
  userID: string;
  closeModal: () => void;
};
export const UserViewModal = (props: UserViewModalProps) => {
  const [user, setUser] = useState<UserType>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    (async () => {
      const { user, error } = await getOtherUsersInfo(props.userID);
      setUser(user);
      setLoading(false);
    })();
  }, [props.userID]);
  return (
    <Modalize ref={props.modalRef} adjustToContentHeight>
      {!user || loading ? (
        <ActivityIndicator style={styles.fullFlex} />
      ) : (
        <UserView user={user} handleClose={props.closeModal}></UserView>
      )}
    </Modalize>
  );
};

export const UserView = ({
  user,
  handleClose,
}: {
  user: UserType;
  handleClose: () => void;
}) => {
  const handleRemove = () => {
    showAlert({
      firstText: "Are you sure?",
      secondText: `${user.name} will be removed as your friend.`,
      firstButtonText: "Remove",
      secondButtonText: "Cancel",
      firstButtonHandleClose: async () => {
        await removeFriend(user._id);
        handleClose();
      },
    });
  };

  if (user.isFriend) {
    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <UserAvatar avatar={user.avatar} />
          <View style={styles.colContainer}>
            <Text adjustsFontSizeToFit style={styles.name} numberOfLines={2}>
              {user.name}
            </Text>

            <Text style={styles.username}>@{user.username}</Text>
            <Text style={styles.friends}>Is Friends with you</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.centerDiv}>
            <Text style={styles.name}> Groups</Text>
            <Text style={styles.largeText}>{user.groups}</Text>
          </View>
          <View style={styles.centerDiv}>
            <Text style={styles.name}> Movies Liked</Text>
            <Text style={styles.largeText}>{user.liked_movies}</Text>
          </View>
        </View>
        <CustomButton
          style={styles.button}
          text="Remove as a friend"
          onPressHandler={handleRemove}
        />
      </View>
    );
  } else {
    return <AddFriendModal user={user} handleClose={handleClose} />;
  }
};

const styles = StyleSheet.create({
  fullFlex: {
    flex: 1,
    padding: 40,
    marginVertical: 50,
  },
  container: {
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  rowContainer: {
    flexDirection: "row",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  colContainer: {
    padding: 10,
    flexShrink: 1,
  },

  image: {
    height: 150,
    width: 150,
    borderRadius: 20,
  },
  name: {
    fontSize: 29,
    fontWeight: "600",
    marginBottom: 5,
  },
  centerDiv: {
    alignItems: "center",
  },
  username: {
    fontSize: 15,
    fontWeight: "600",
  },
  friends: {
    paddingVertical: 20,
    justifyContent: "flex-end",
    fontSize: 18,
    color: "#222",
  },
  largeText: {
    fontSize: 50,
    color: "#444",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#F78473",
    borderRadius: 20,
    paddingVertical: 15,
    marginTop: 20,
  },
});
