import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { CustomButton } from "../../UtilComponents/CustomButton";
import { Styles } from "../styles";
import { AccountNavProps } from "../Navigation/AccountTypes";
import { Modalize } from "react-native-modalize";
import { UserViewModal } from "../../UserViewModal/FriendViewModal";
import { UserAvatar } from "../../UserViewModal/UserAvatar";
import { getFriends } from "../../../utils/userdbUtils";
import { Loading } from "../../UtilComponents/Loading";
import { ErrorPopup } from "../../UtilComponents/ErrorPopup";

type FriendsType = {
  _id: string;
  name: string;
  username: string;
  avatar: string;
};
export const Friends = ({ navigation }: AccountNavProps<"Friends">) => {
  const [friends, setFriends] = useState<FriendsType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const [selectedUser, setUser] = useState("");
  useEffect(() => {
    let s = 1;
    const unsubscribe = navigation.addListener("focus", async () => {
      setLoading(true);
      const { friends, error } = await getFriends();
      if (error) {
        console.log("yes");
        setError(error);
        s = setTimeout(() => {
          setError("");
        }, 2000);
      } else {
        setFriends(friends);
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
      clearTimeout(s);
    };
  }, [navigation]);

  const modalRef = useRef<Modalize>();
  const openModal = (id: string) => {
    setUser(id);
    modalRef.current?.open();
  };
  const closeModal = async () => {
    modalRef.current?.close();
    const { friends, error } = await getFriends();
    setFriends(friends);
  };

  const renderFriends = ({ item }: { item: FriendsType }) => {
    return (
      <Pressable
        key={item._id}
        style={Styles.friends}
        onPress={() => openModal(item._id)}
      >
        <UserAvatar avatar={item.avatar} size={35} borderRadius={30} />
        <Text style={Styles.friendsName}> {item.name}</Text>
      </Pressable>
    );
  };

  const renderFriendsComponent = () => {
    if (friends.length !== 0) {
      return (
        <>
          <CustomButton
            text="Add Friend"
            style={Styles.addFriendContainer}
            onPressHandler={() => {
              navigation.navigate("Add a Friend");
            }}
          />
          <TextInput editable={false} style={Styles.customText}>
            Friends
          </TextInput>
          <FlatList
            contentContainerStyle={{ paddingVertical: 20 }}
            renderItem={renderFriends}
            data={friends}
            keyExtractor={(item: FriendsType) => item._id}
          />
          <UserViewModal
            modalRef={modalRef}
            userID={selectedUser}
            closeModal={closeModal}
          />
        </>
      );
    } else {
      return (
        <View
          style={{
            ...Styles.buttonsContainer,
            marginVertical: 30,
            justifyContent: "center",
          }}
        >
          <Text style={Styles.customText}>You don't have any friends yet!</Text>
          <Text style={{ ...Styles.customText, marginTop: 0 }}>
            Let's get started!
          </Text>
          <CustomButton
            text="Add a Friend"
            style={{
              ...Styles.addFriendContainer,
              alignSelf: "center",
              width: "80%",
            }}
            onPressHandler={() => {
              navigation.navigate("Add a Friend");
            }}
          />
        </View>
      );
    }
  };

  const renderLoadingComponent = () => {
    return (
      <View style={Styles.container}>
        <CustomButton
          text="Add Friend"
          style={Styles.addFriendContainer}
          onPressHandler={() => {
            navigation.navigate("Add a Friend");
          }}
        />
        <TextInput editable={false} style={Styles.customText}>
          Friends
        </TextInput>
        <Loading size="large" />
        {error !== "" && <ErrorPopup error={error} />}
      </View>
    );
  };

  if (loading) {
    return renderLoadingComponent();
  } else {
    return (
      <View style={Styles.container}>
        {renderFriendsComponent()}
        {error !== "" && <ErrorPopup error={error} />}
      </View>
    );
  }
};
