import React, { useState } from "react";
import { View, Text, ImageBackground, Pressable } from "react-native";

type Movies = {
  _id: string;
  genres: string[];
  poster_path: string;
  title: string;
};

type CardProps = {
  card: Movies;
  onModalOpen: (cardID: string) => void;
};

// Card component to display poster, title and genre
export const Card = ({ card, onModalOpen }: CardProps) => {
  return (
    <View
      style={{
        marginTop: "-15%",
        flex: 0.8,
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
      <Pressable
        onPress={() => {
          onModalOpen(card._id);
        }}
        style={{ position: "absolute", left: 15, bottom: 20 }}
      >
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
      </Pressable>
    </View>
  );
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
