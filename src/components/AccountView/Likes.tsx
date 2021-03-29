import { useHeaderHeight } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  useWindowDimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { getLikedMovies } from "../../utils/userdbUtils";
import { Center } from "../UtilComponents/Center";
import { MovieInfoModal } from "../SwipeCard/MovieInfoModal";
import { Styles } from "./styles";

type MovieType = {
  _id: string;
  poster_path: string;
  overview: string;
  title: string;
};
export const Likes = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setselectedMovie] = useState("");
  const modalizeRef = useRef<Modalize>();
  useEffect(() => {
    (async () => {
      const { response, error } = await getLikedMovies();
      setMovies(response);
    })();
  }, [setMovies]);

  const windowHeight = useWindowDimensions().height;
  const headerHeight = useHeaderHeight();

  const showModal = (id: string) => {
    setselectedMovie(id);
    modalizeRef.current?.open();
  };

  const renderMovies = ({ item }: { item: MovieType }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => showModal(item._id)}
        key={item._id}
      >
        <View style={Styles.movies}>
          <Image
            style={{ width: 40, height: 40, borderRadius: 10 }}
            source={{
              uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
            }}
          ></Image>
          <View style={Styles.movieTextContainer}>
            <Text style={Styles.movieText}> {item.title}</Text>
            <Text numberOfLines={2} style={Styles.movieOverview}>
              {item.overview}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={{ ...Styles.container, paddingTop: 0 }}>
      <FlatList
        renderItem={renderMovies}
        data={movies}
        keyExtractor={(item: MovieType) => item._id}
        contentContainerStyle={{ paddingTop: 20 }}
      />
      <Modalize
        ref={modalizeRef}
        modalHeight={windowHeight - headerHeight - 100}
      >
        <MovieInfoModal info={selectedMovie} />
      </Modalize>
    </View>
  );
};
