import { useHeaderHeight } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { getLikedMovies } from "../../../utils/userdbUtils";
import { MovieInfoModal } from "../../SwipeCard/MovieInfoModal";
import { ErrorPopup } from "../../UtilComponents/ErrorPopup";
import { Loading } from "../../UtilComponents/Loading";
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
  const [error, setError] = useState<string>("");

  const modalizeRef = useRef<Modalize>();
  useEffect(() => {
    let s1 = 1;
    (async () => {
      setLoading(true);
      const { response, error } = await getLikedMovies();
      if (error) {
        setError(error);
        s1 = setTimeout(() => {
          setError("");
        }, 2000);
        return;
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
    return clearTimeout(s1);
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

  const showLoadingComponent = () => (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        paddingTop: 20,
        backgroundColor: "#E2EAF4",
      }}
    >
      {["random", "c"].map((r) => (
        <View
          key={r}
          style={{
            flexDirection: "row",
            padding: 10,
            backgroundColor: "white",
            marginVertical: 5,
            width: "90%",
            alignSelf: "center",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              padding: 40,
              backgroundColor: "grey",
              marginHorizontal: 5,
              alignSelf: "flex-start",
              borderRadius: 10,
            }}
          />
          <View style={{ width: "80%" }}>
            <View
              style={{
                padding: 10,
                backgroundColor: "grey",
                width: "60%",
                borderRadius: 10,
                marginBottom: 10,
                marginHorizontal: 10,
              }}
            />
            <View
              style={{
                marginVertical: 5,
                marginHorizontal: 10,
                padding: 4,
                backgroundColor: "grey",
                width: "80%",
                borderRadius: 10,
              }}
            />
            <View
              style={{
                marginVertical: 5,
                marginHorizontal: 10,
                padding: 4,
                backgroundColor: "grey",
                width: "80%",
                borderRadius: 10,
              }}
            />
          </View>
        </View>
      ))}
      <Loading />
      {error !== "" && <ErrorPopup error={error} />}
    </View>
  );

  if (loading) {
    return showLoadingComponent();
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
