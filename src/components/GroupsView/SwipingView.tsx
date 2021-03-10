import React from "react";
import { Text, View, StyleSheet, Button, StatusBar } from "react-native";
import Swiper from "react-native-deck-swiper";

import { styles } from "./styles";

export const SwipingView = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          paddingHorizontal: 10,
          marginTop: 10,
          backgroundColor: "#F78473",
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "white",
          }}
        >
          5:00
        </Text>
      </View>

      <Swiper
        cards={[
          "Dummy",
          "Data",
          "Movie1",
          "Movie2",
          "Movie3",
          "Movie4",
          "Movie5",
        ]}
        containerStyle={{
          marginTop: "10%",
        }}
        renderCard={(card) => {
          return (
            <View
              style={{
                marginTop: "-15%",
                flex: 0.7,
                borderRadius: 4,
                borderWidth: 2,
                borderColor: "#fff",
                justifyContent: "center",
                backgroundColor: "yellow",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 50,
                  backgroundColor: "transparent",
                }}
              >
                {card}
              </Text>
            </View>
          );
        }}
        // onSwiped={(cardIndex) => {
        //   console.log(cardIndex);
        // }}
        // onSwipedAll={() => {
        //   console.log("onSwipedAll");
        // }}
        cardIndex={0}
        backgroundColor={"#fff"}
        stackSize={2}
        infinite
      ></Swiper>
    </View>
  );
};
