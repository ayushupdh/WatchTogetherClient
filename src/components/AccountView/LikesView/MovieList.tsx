import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";

type MovieType = {
  _id: string;
  poster_path: string;
  overview: string;
  title: string;
  genres: string[];
};

type MovieListProps = {
  data: MovieType[] | undefined;
  showModal: (id: string) => void;
};
export const MovieList = (props: MovieListProps) => {
  const renderMovies = ({ item }: { item: MovieType }) => {
    return (
      <Pressable
        style={styles.pressable}
        onPress={() => props.showModal(item._id)}
        key={item._id}
      >
        <View style={styles.movieContainer}>
          <Image
            style={styles.movieThumbnail}
            source={{
              uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
            }}
          ></Image>
          <View style={styles.movieTextContainer}>
            <Text style={styles.movieText}> {item.title}</Text>
            <Text numberOfLines={2} style={styles.movieOverview}>
              {item.overview}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <FlatList
      renderItem={renderMovies}
      data={props.data}
      keyExtractor={(item: MovieType) => item._id}
      contentContainerStyle={{ paddingTop: 20 }}
    />
  );
};

const styles = StyleSheet.create({
  pressable: {
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    elevation: 5,
  },
  movieContainer: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "white",
    marginVertical: 5,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  movieThumbnail: { width: 40, height: 40, borderRadius: 10 },
  movieTextContainer: {
    flex: 1,
    flexDirection: "column",
    overflow: "hidden",
    paddingLeft: 10,
  },
  movieText: {
    fontSize: 15,
    color: "#000",
    fontWeight: "bold",
    paddingTop: -10,
  },
  movieOverview: {
    fontSize: 12,
    color: "#333",
  },
});
