import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FormField } from "../../GroupsView/FormField";
import { Styles } from "../styles";
import { searchUsers } from "../../../utils/userdbUtils";
import { Modalize } from "react-native-modalize";
import { AddFriendModal } from "../../UserViewModal/AddFriendModal";
import { UserViewModal } from "../../UserViewModal/FriendViewModal";
import { UserAvatar } from "../../UserViewModal/UserAvatar";
import { Loading } from "../../UtilComponents/Loading";

type AddFreindProps = {};
export const AddFreind = (props: AddFreindProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setUser] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(true);
  const [foundUsers, setUserList] = useState([]);

  const modalizeRef = useRef<Modalize>();

  const onPressHandler = (userID: string) => {
    setUser(userID);
    modalizeRef.current?.open();
  };

  const findUser = async () => {
    if (searchTerm.length < 3) {
      setError("Need atleast three characters to start searching.");
    } else {
      setLoading(true);
      if (first) {
        setFirst(false);
      }
      const { response, error } = await searchUsers(searchTerm);
      if (!error) {
        setUserList(response);
      } else {
        setUserList([]);
      }
      setLoading(false);
    }
  };
  const closeModal = () => {
    modalizeRef.current?.close();
  };

  const renderItem = ({ item }: any) => {
    return (
      <View style={Styles.friends}>
        <UserAvatar avatar={item.avatar} size={35} borderRadius={30} />
        <Text
          style={Styles.friendsName}
          onPress={() => {
            onPressHandler(item._id);
          }}
        >
          {item.name}
        </Text>
      </View>
    );
  };

  const loadBody = () => {
    if (first) {
      return <Text style={Styles.customText}>Start a search...</Text>;
    } else if (foundUsers && foundUsers.length !== 0) {
      return (
        <View style={{ flex: 1 }}>
          {/* Used Textinput to support botton border */}

          <TextInput editable={false} style={Styles.customText}>
            Users
          </TextInput>
          {loading ? (
            <ActivityIndicator color={"#313B68"} />
          ) : (
            <FlatList
              contentContainerStyle={{ paddingVertical: 20 }}
              data={foundUsers}
              renderItem={renderItem}
              keyExtractor={(item: any) => item._id}
            />
          )}
        </View>
      );
    } else {
      return (
        <>
          {/* Used Textinput to support botton border */}
          <TextInput editable={false} style={Styles.customText}>
            Users
          </TextInput>
          {loading ? (
            <ActivityIndicator color={"#313B68"} />
          ) : (
            <Text style={Styles.errorText}>
              No user found with that username or email
            </Text>
          )}
        </>
      );
    }
  };

  return (
    <View style={{ ...Styles.container, padding: 0 }}>
      <FormField
        containerStyle={{ width: "90%", alignSelf: "center" }}
        title="Search for friends"
        placeholder="Username or Email"
        value={searchTerm}
        onChangeHandler={setSearchTerm}
        error={error}
        onSubmitEditing={findUser}
        onFocus={() => {
          setError("");
        }}
      />
      {loadBody()}
      <UserViewModal
        modalRef={modalizeRef}
        userID={selectedUser}
        closeModal={closeModal}
      />
    </View>
  );
};
