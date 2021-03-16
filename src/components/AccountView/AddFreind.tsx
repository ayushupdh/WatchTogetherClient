import React, { useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import { setAuthToken } from "../../utils/authToken";
import { FormField } from "../GroupsView/FormField";
import { Styles } from "./styles";
import { server } from "../../api/server";

type AddFreindProps = {};
export const AddFreind = (props: AddFreindProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [foundUsers, setUserList] = useState([
    {
      _id: "ajscnaskcj",
      username: "blahusername",
      name: "blahname",
    },
  ]);
  const findUser = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      setAuthToken(token);
      const response = await server.get("/users/find", {
        params: {
          username: searchTerm,
        },
      });
      const friensList = response.data.friends;
      setUserList(friensList);
      setError("");
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <View style={Styles.container}>
      <FormField
        containerStyle={{ width: "90%", alignSelf: "center" }}
        title="Search for friends"
        placeholder="Username or Email"
        value={searchTerm}
        onChangeHandler={setSearchTerm}
        error={error}
      />
      {foundUsers.length !== 0 && (
        <View>
          <Text style={Styles.customText}>Users</Text>
          {foundUsers.map((user) => (
            <View key={user._id} style={Styles.friends}>
              <Ionicons name="person-circle-sharp" size={24} color="black" />
              <Text style={Styles.friendsName}> {user.name}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
