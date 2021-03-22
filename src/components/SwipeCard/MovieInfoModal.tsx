import React, { useRef } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { useGetMovieInfo } from "../../hooks/useGetMovieInfo";
import { genreBox } from "./Card";

//TODO: Move the styles to their own file
type MovieInfoModalProps = {
  info: string;
};
export const MovieInfoModal = ({ info }: MovieInfoModalProps) => {
  const { movieInfo, error } = useGetMovieInfo(info);
  const width = useWindowDimensions().width;

  if (!movieInfo) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width, height: 200, borderRadius: 10 }}
            source={{
              uri: `https://image.tmdb.org/t/p/original${movieInfo.poster_path}`,
            }}
          ></Image>
        </View>

        <View style={{ padding: 5, alignItems: "center" }}>
          <Text style={{ fontSize: 32, fontWeight: "bold" }}>
            {movieInfo.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              borderRadius: 5,
              flexWrap: "wrap",
              shadowOffset: { width: 5, height: 4 },
              shadowColor: "#000",
              shadowOpacity: 0.4,
              marginVertical: 5,
              elevation: 5,
            }}
          >
            {movieInfo.genres.map((genre: string) => {
              return genreBox(genre);
            })}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            padding: 20,
            justifyContent: "space-around",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 19,
                color: "#777",
                paddingBottom: 5,
                fontWeight: "500",
              }}
            >
              Length
            </Text>
            <Text style={{ fontSize: 19, fontWeight: "500" }}>
              {movieInfo.runtime}
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 19,
                color: "#777",
                paddingBottom: 5,
                fontWeight: "500",
              }}
            >
              Year
            </Text>
            <Text style={{ fontSize: 19, fontWeight: "500" }}>
              {movieInfo.release_date.split("-")[0]}
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 19,
                color: "#4B4F43",
                paddingBottom: 5,
                fontWeight: "500",
              }}
            >
              Language
            </Text>
            <Text style={{ fontSize: 19, fontWeight: "500" }}>
              {movieInfo.spoken_languages[0]}
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, justifyContent: "space-around" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              paddingBottom: 10,
            }}
          >
            Storyline
          </Text>

          <Text style={{ fontSize: 17, color: "#4B4F43" }}>
            {movieInfo.overview}
          </Text>
        </View>
        {movieInfo.providers.length > 0 && (
          <View style={{ padding: 20, justifyContent: "space-around" }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                paddingBottom: 10,
              }}
            >
              Available On
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              {movieInfo.providers.map((provider: any) => {
                return (
                  <View
                    key={provider.provider_id}
                    style={{ alignItems: "center", flexBasis: 80 }}
                  >
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 30,
                      }}
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500${provider.logo_path}`,
                      }}
                    ></Image>
                    <Text style={{ fontSize: 10 }}>
                      {provider.provider_name}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </View>
    );
  }
};
