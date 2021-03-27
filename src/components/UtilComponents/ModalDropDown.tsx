import React from "react";
import { View, Image, Text, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ModalDropDownProps = {
  data: { name: string; _id: string; avatar?: string }[] | null;
  onClick: any;
};
export const ModalDropDown = (props: ModalDropDownProps) => {
  if (props.data) {
    if (props.data.length > 0) {
      return (
        <View
          style={{
            position: "absolute",
            top: 0,
            padding: 5,
            backgroundColor: "white",
            width: "100%",
            borderRadius: 20,
            shadowOffset: { width: 5, height: 4 },
            shadowColor: "#000",
            shadowOpacity: 0.4,
            elevation: 5,
          }}
        >
          {props.data &&
            props.data.map((datas) => {
              return (
                <View
                  key={datas._id}
                  style={{
                    flexDirection: "row",
                    padding: 10,
                    alignSelf: "flex-start",
                  }}
                >
                  {datas.avatar && datas.avatar !== "" ? (
                    <Image
                      source={{ uri: datas.avatar }}
                      style={{ width: 40, height: 40, borderRadius: 20 }}
                    />
                  ) : (
                    <Ionicons
                      name="person-circle-sharp"
                      size={40}
                      color="black"
                    />
                  )}

                  <Text
                    style={{
                      flex: 1,
                      marginLeft: 15,
                      fontSize: 20,
                      fontWeight: "500",
                      alignSelf: "center",
                    }}
                    onPress={() => {
                      props.onClick(datas);
                    }}
                  >
                    {datas.name}
                  </Text>
                </View>
              );
            })}
        </View>
      );
    } else {
      return (
        <View
          style={{
            position: "absolute",
            top: 0,
            padding: 15,
            backgroundColor: "white",
            width: "100%",
            borderRadius: 20,
            shadowOffset: { width: 5, height: 4 },
            shadowColor: "#000",
            shadowOpacity: 0.4,
            elevation: 5,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              alignSelf: "center",
              padding: 10,
              color: "red",
            }}
          >
            No users found in your friendlist with that username or email
          </Text>
        </View>
      );
    }
  } else {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          padding: 15,
          backgroundColor: "white",
          width: "100%",
          borderRadius: 20,
          shadowOffset: { width: 5, height: 4 },
          shadowColor: "#000",
          shadowOpacity: 0.4,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            alignSelf: "center",
            paddingBottom: 20,
          }}
        >
          Getting users...
        </Text>
        <ActivityIndicator style={{ flex: 1 }} />
      </View>
    );
  }
};
