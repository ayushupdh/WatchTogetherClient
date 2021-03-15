import React, { useState } from "react";
import { View, Text, ImageBackground, ActivityIndicator } from "react-native";
import { styles } from "../GroupsView/styles";
import { MovieInfoModal } from "./MovieInfoModal";

type CardProps = {
  card: any;
  onModalOpen: (card: any) => void;
};
export const Card = ({ card, onModalOpen }: CardProps) => {
  if (card) {
    return (
      <View
        style={{
          marginTop: "-15%",
          flex: 0.7,
          borderRadius: 20,
          borderWidth: 2,
          borderColor: "#fff",
          justifyContent: "center",
          backgroundColor: "#fff",
          height: "80%",
          overflow: "hidden",
        }}
      >
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/original${card.poster_path}`,
          }}
          style={{ height: "100%" }}
        ></ImageBackground>
        <View style={{ position: "absolute", left: 15, bottom: 20 }}>
          <Text
            style={{
              color: "#fff",
              fontSize: 30,
              fontWeight: "bold",
              alignSelf: "flex-start",
              marginBottom: 3,
              marginRight: 5,
              padding: 2,
              textShadowRadius: 2,
              textShadowColor: "#666",
              textShadowOffset: { width: -0.4, height: 0.4 },
            }}
          >
            {card.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-start",
              borderRadius: 5,
              flexWrap: "wrap",
              shadowOffset: { width: 5, height: 4 },
              shadowColor: "#000",
              shadowOpacity: 0.4,
              marginVertical: 5,
              elevation: 5,
            }}
          >
            {card.genres.map((genre: string) => {
              return genreBox(genre);
            })}
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={{
          marginTop: "-15%",
          flex: 0.7,
          borderRadius: 20,
          borderWidth: 2,
          borderColor: "#fff",
          justifyContent: "center",
          backgroundColor: "yellow",
          height: "80%",
          overflow: "hidden",
        }}
      >
        <ActivityIndicator style={{ flex: 1 }} />
      </View>
    );
  }
};

export const genreBox = (text: string) => {
  return (
    <React.Fragment key={text}>
      <View
        style={{
          paddingHorizontal: 10,
          marginLeft: 5,
          marginBottom: 2,
          paddingVertical: 5,
          backgroundColor: "#fff",
          borderRadius: 20,
        }}
      >
        <Text style={{ color: "#313B68" }}>{text}</Text>
      </View>
      <View />
    </React.Fragment>
  );
};
