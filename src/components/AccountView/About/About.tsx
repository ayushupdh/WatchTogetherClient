import React from "react";
import { View, Text, Image } from "react-native";
import { style } from "./About.styles";

export const About = () => {
  return (
    <View style={style.container}>
      <View style={style.titleContainer}>
        <Image
          style={{ height: 75, width: 75 }}
          source={require("../../Auth/assets/Login.png")}
        ></Image>
        <Text style={style.title}>Watch Together</Text>
      </View>

      <View style={style.subtextContainer}>
        <Text style={style.subtext}>
          Watch Together is a cross-platform mobile app that helps user pick
          movies to watch all by themselves or with a group of friends in real
          time.
        </Text>
        <Text style={style.subtext}>
          All the movie data for this app was gathered from the TMDB API.
        </Text>
        <Image
          // style={{ height: 75, width: 75 }}
          source={require("./assets/logo.png")}
        />
      </View>
    </View>
  );
};
