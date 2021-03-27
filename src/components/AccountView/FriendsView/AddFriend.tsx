import React, { useRef, useState } from "react";
import { View, Text, FlatList, Image, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FormField } from "../../GroupsView/FormField";
import { Styles } from "../styles";
import { searchUsers } from "../../../utils/userdbUtils";
import { Modalize } from "react-native-modalize";
import { AddFriendModal } from "./AddFriendModal";

type AddFreindProps = {};
export const AddFreind = (props: AddFreindProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setUser] = useState({});
  const [error, setError] = useState("");
  const [first, setFirst] = useState(true);
  const [foundUsers, setUserList] = useState([]);
  const modalizeRef = useRef<Modalize>(null);
  console.log(foundUsers);
  const onPressHandler = (user: any) => {
    setUser(user);
    modalizeRef.current?.open();
  };

  const findUser = async () => {
    if (searchTerm.length < 3) {
      setError("Need atleast three characters to start searching.");
    } else {
      if (first) {
        setFirst(false);
      }
      const { response, error } = await searchUsers(searchTerm);
      if (!error) {
        setUserList(response);
      } else {
        setError(error);
      }
    }
  };
  const closeModal = () => {
    modalizeRef.current?.close();
  };

  const renderItem = ({ item }: any) => {
    return (
      <View style={Styles.friends}>
        {item.avatar && item.avatar !== "" ? (
          <Image
            source={{ uri: item.avatar }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        ) : (
          <Ionicons name="person-circle-sharp" size={30} color="black" />
        )}
        <Text
          style={Styles.friendsName}
          onPress={() => {
            onPressHandler(item);
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
          <FlatList
            contentContainerStyle={{ paddingVertical: 20 }}
            data={foundUsers}
            renderItem={renderItem}
            keyExtractor={(item: any) => item._id}
          />
        </View>
      );
    } else {
      return (
        <>
          {/* Used Textinput to support botton border */}
          <TextInput editable={false} style={Styles.customText}>
            Users
          </TextInput>
          <Text style={Styles.errorText}>
            No user found with matching username or email
          </Text>
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
      <Modalize ref={modalizeRef} adjustToContentHeight>
        <AddFriendModal
          user={selectedUser}
          handleClose={() => {
            closeModal();
          }}
        />
      </Modalize>
    </View>
  );
};
