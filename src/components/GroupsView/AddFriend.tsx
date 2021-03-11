import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList, Text, View } from "react-native";
import { FormField } from "./FormField";
import { styles } from "./styles";
import { CustomButton } from "../dumbComponents/CustomButton";
import { GroupsNavProps } from "./Navigation/GroupsTypes";

type AddFriendProps = {};
export const AddFriend = ({
  route,
  navigation,
}: GroupsNavProps<"Add a Friend">) => {
  const [friend, setFriend] = useState<string>("");
  const [friendList, setFriendList] = useState<{ name: string; key: string }[]>(
    []
  );
  const addToFriendList = (name: string) => {
    setFriendList((oldList) => [
      ...oldList,
      { name, key: Math.floor(Math.random() * 10000).toString() },
    ]);
  };
  const renderItem = ({ item }: any) => (
    <View style={styles.friendsNotjoined}>
      <Ionicons name="person-circle-sharp" size={24} color="black" />
      <Text style={styles.friendsName}>{item.name}</Text>
      <MaterialIcons
        onPress={() =>
          setFriendList((oldList) =>
            oldList.filter((list) => list.key !== item.key)
          )
        }
        name="cancel"
        size={24}
        color="#aaa"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.eightypercenContainer}>
        <FormField
          title="Add a Friend"
          placeholder="Username or Email"
          value={friend}
          onChangeHandler={(e) => {
            setFriend(e);
          }}
          onSubmitEditing={(e) => addToFriendList(e.nativeEvent.text)}
          error=""
          returnKeyType="search"
        />
        <Text style={{ fontSize: 15, color: "#767676" }}>
          {friendList.length === 0
            ? "Add friends to the group"
            : "Waiting for friends to join..."}
        </Text>
        <View style={styles.hundredpercenContainer}>
          <FlatList
            data={friendList}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
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
  );
};
