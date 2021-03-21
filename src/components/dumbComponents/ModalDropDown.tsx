import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ModalDropDownProps = {
  data: { name: string; _id: string }[] | null;
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
                  }}
                >
                  <Ionicons
                    name="person-circle-sharp"
                    size={24}
                    color="black"
                  />
                  <Text
                    style={{
                      flex: 1,
                      marginLeft: 5,
                      fontSize: 20,
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
