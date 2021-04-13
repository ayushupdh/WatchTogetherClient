import React from "react";
import { View, Image, Text, ActivityIndicator, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ModalDropDownProps = {
  data: { name: string; _id: string; avatar?: string }[] | null;
  onClick: any;
};
export const ModalDropDown = (props: ModalDropDownProps) => {
  if (props.data) {
    if (props.data.length > 0) {
      return (
        <Pressable
          style={{
            zIndex: 2,
            flex: 1,
            position: "absolute",
            top: 110,
            padding: 5,
            backgroundColor: "white",
            width: "100%",
            borderRadius: 20,
            shadowOffset: { width: 5, height: 4 },
            shadowColor: "#000",
            shadowOpacity: 0.4,
            elevation: 6,
          }}
        >
          {props.data &&
            props.data.map((datas) => {
              return (
                <Pressable
                  onPress={() => {
                    console.log("presed");
                    props.onClick(datas);
                  }}
                  key={datas._id}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#f1f1f1" : "#fff",
                      flexDirection: "row",
                      padding: 10,
                      alignSelf: "flex-start",
                    },
                  ]}
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
                  >
                    {datas.name}
                  </Text>
                </Pressable>
              );
            })}
        </Pressable>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            zIndex: 2,
            position: "absolute",
            top: 110,
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
          flex: 1,
          zIndex: 2,
          position: "absolute",
          top: 110,
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
