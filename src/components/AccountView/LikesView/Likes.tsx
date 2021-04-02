import { useHeaderHeight } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { getLikedMovies } from "../../../utils/userdbUtils";
import { MovieInfoModal } from "../../SwipeCard/MovieInfoModal";
import { Styles } from "../styles";
import { GenreList } from "./GenreList";
import { MovieList } from "./MovieList";

type MovieType = {
  _id: string;
  poster_path: string;
  overview: string;
  title: string;
  genres: string[];
};
export const Likes = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [genreList, setGenreList] = useState<string[]>();
  const [selectedMovie, setselectedMovie] = useState("");
  const [selectedGenre, setselectedGenre] = useState("");
  const [generatedMovieList, setMovieList] = useState<MovieType[]>();

  const modalizeRef = useRef<Modalize>();
  useEffect(() => {
    (async () => {
      const { response, error } = await getLikedMovies();
      if (error) {
        return console.log(error);
      }
      setMovies(response);
      const s: Set<string> = new Set();
      response.forEach((el: MovieType) => {
        el.genres.forEach((oops: string) => {
          s.add(oops);
        });
      });
      setGenreList(Array.from(s));
    })();
  }, [setMovies]);

  const windowHeight = useWindowDimensions().height;
  const headerHeight = useHeaderHeight();

  const onSelectGenre = (genre: string) => {
    if (selectedGenre === "") {
      let m = movies?.filter((movie) => {
        return movie.genres.includes(genre);
      });
      setMovieList(m);
      setselectedGenre(genre);
    } else {
      setMovieList([]);
      setselectedGenre("");
    }
  };

  const showModal = (id: string) => {
    setselectedMovie(id);
    modalizeRef.current?.open();
  };
  if (movies.length === 0) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }
  return (
    <View style={{ ...Styles.container, paddingTop: 0 }}>
      <GenreList
        data={selectedGenre === "" ? genreList : [selectedGenre]}
        onSelect={onSelectGenre}
      />
      <MovieList
        data={selectedGenre === "" ? movies : generatedMovieList}
        showModal={showModal}
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
