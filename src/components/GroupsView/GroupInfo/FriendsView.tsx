import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { UserAvatar } from "../../UserViewModal/UserAvatar";
import { Loading } from "../../UtilComponents/Loading";
import { styles } from "../styles";

type FriendsViewProps = {
  groupsLoading: boolean;
  groupInfo: any;
  showModal: (id: string) => void;
};
export const FriendsView = ({
  groupInfo,
  groupsLoading,
  showModal,
}: FriendsViewProps) => {
  // Show each friends
  const renderMembers = ({ item }: any) => (
    <Pressable style={styles.friends} onPress={() => showModal(item._id)}>
      <UserAvatar avatar={item.avatar} size={40} borderRadius={20} />
      <Text style={styles.friendsName}>{item.name}</Text>
    </Pressable>
  );

  return (
    <View style={styles.friendsListContainer}>
      {groupsLoading ? (
        <Loading />
      ) : groupInfo ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={groupInfo.users}
          renderItem={renderMembers}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <Text>No users in this group</Text>
      )}
    </View>
  );
};
