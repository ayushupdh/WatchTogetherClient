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
import { Center } from "../../UtilComponents/Center";
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
  const [loading, setLoading] = useState<boolean>(false);

  const modalizeRef = useRef<Modalize>();
  useEffect(() => {
    (async () => {
      setLoading(true);
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
      setLoading(false);
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

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  } else {
    if (movies.length === 0) {
      return (
        <View
          style={{
            ...Styles.container,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: "#777",
            }}
          >
            You don't have any liked movies yet. Start swiping and the movies
            you've liked will show up here!
          </Text>
        </View>
      );
    } else {
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
    }
  }
};
