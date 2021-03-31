import React from "react";
import { Image, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type UserAvatarProps = {
  avatar: string | undefined;
  size?: number;
  borderRadius?: number;
};
export const UserAvatar = ({
  avatar,
  size = 150,
  borderRadius = 10,
}: UserAvatarProps) => {
  return avatar && avatar !== "" ? (
    <Image
      source={{ uri: avatar }}
      style={{ width: size, height: size, borderRadius }}
    />
  ) : (
    <View
      style={{
        width: size,
        height: size,
        borderRadius,
        alignItems: "center",
        backgroundColor: "#e9e9e9",
      }}
    >
      <FontAwesome
        //   style={Styles.avatar}
        name="user"
        size={size}
        color="black"
      />
    </View>
  );
};
