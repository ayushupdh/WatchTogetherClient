import React from "react";
import { Image, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type UserAvatarProps = {
  avatar: string | undefined;
  size?: number;
  border?: boolean;
  borderRadius?: number;
};
export const UserAvatar = ({
  avatar,
  size = 150,
  borderRadius = 10,
  border = true,
}: UserAvatarProps) => {
  return avatar && avatar !== "" ? (
    <Image
      source={{ uri: avatar }}
      style={{ width: size, height: size, borderRadius }}
    />
  ) : (
    <View
      style={{
        borderWidth: border ? 1 : 0,
        width: size,
        height: size,
        borderRadius,
        alignItems: "center",
        backgroundColor: "#fafafa",
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
