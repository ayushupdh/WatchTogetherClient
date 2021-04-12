import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { Card } from "./Card";
import { Modalize } from "react-native-modalize";
import { MovieInfoModal } from "./MovieInfoModal";

import { OverlayLabel } from "./Overlay";
import {
  addDislikedMovie,
  addLikedMovie,
  getMoviesForUser,
} from "../../utils/userdbUtils";
import { server } from "../../api/server";
import { useSelector } from "react-redux";
import { SessionType } from "../../redux/reducers/sessionReducers";
import { CustomButton } from "../UtilComponents/CustomButton";
import { socketClient } from "../io/io";
import { emitter } from "../io/io.emit";
import { useHeaderHeight } from "@react-navigation/stack";

type Movies = {
  _id: string;
  genres: string[];
  poster_path: string;
  title: string;
};
export const SwipeCard = ({
  onMovieFinish,
  navigateBack,
  groupType,
}: {
  onMovieFinish: () => void;
  navigateBack: () => void;
  groupType: "Single" | "Group";
}) => {
  // Store array of movies
  const [movies, setMovies] = useState<Movies[]>([]);
  const sessionID = useSelector(
    ({ session }: { session: { sessionID: string } }) => session.sessionID
  );
  // Store card index
  const [cardIndex, setIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ref for movie info modal
  const modalizeRef = useRef<Modalize>(null);
  // Sets the activity indicator for when the data is loading
  const [loading, setLoading] = useState(true);
  // Holds the movie index of the clicked card
  const [state, setstate] = useState("");
  const params = useSelector(
    ({
      session,
    }: {
      session: { sessionParams: SessionType["sessionParams"] };
    }) => session.sessionParams
  );
  const [swipes, setSwipes] = useState({
    swipedRight: false,
    swipedLeft: false,
  });
  const [firstMount, setFirstMount] = useState<boolean>(false);
  // useEffect(() => {
  //   if (groupType === "Group") {
  //     reloadCards();

  //   }
  // }, [sessionID, groupType, currentIndex]);

  useEffect(() => {
    if (!firstMount) {
      setFirstMount(true);
      reloadCards();
    }
  }, [firstMount, sessionID, groupType, movies, currentIndex]);

  const reloadCards = async () => {
    if (groupType === "Single") {
      const { response, error } = await getMoviesForUser(
        15,
        params?.genres,
        params?.lang,
        params?.providers
      );
      if (response.length === 0) {
        onMovieFinish();
      }
      // This worked previously, but can be memory drain
      // setMovies((prev: any) => prev.concat(m));
      setMovies(response); //THis works with setindex to zero
      setLoading(false);
    } else {
      setLoading(true);
      if (sessionID) {
        const fetched_movies = await emitter.getMoviesForSession(
          sessionID,
          currentIndex
        );
        setMovies(fetched_movies);
        setCurrentIndex((prev) => fetched_movies.length + prev);
      }
      setLoading(false);
    }
  };
  // Open modal to display movie info
  const onPressHandler = (movieID: string) => {
    // Set the movie index of the clicked card
    setstate(movieID);
    modalizeRef.current?.open();
  };

  // Get window dimensions for swiping card
  const windowHeight = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  // Functions to handle liked and disliked movie cards
  const handleLike = async (index: any) => {
    if (groupType === "Single") {
      const movieID = movies[index]["_id"];
      const { response, error } = await addLikedMovie(movieID);
      if (error) {
        console.log(error);
      }
    } else {
      emitter.addToLikedMovies(sessionID, movies[index]["_id"]);
    }
  };

  const handleDislike = async (index: any) => {
    if (groupType === "Single") {
      const movieID = movies[index]["_id"];
      const { response, error } = await addDislikedMovie(movieID);
      if (error) {
        console.log(error);
      }
    } else {
      console.log("");
    }
  };
  const swiped = (index: number) => {
    setIndex((prev) => prev + 1);
  };

  const onSwipedAll = () => {
    setLoading(true);
    reloadCards();
    setIndex(0);
  };

  // If movies were fetched, so swiper or else show activity indicator
  if (movies && movies.length !== 0 && !loading) {
    return (
      <>
        <Swiper
          cards={movies}
          containerStyle={{
            marginTop: "10%",
            backgroundColor: "#E2EAF4",
          }}
          renderCard={(card) => {
            return <Card onModalOpen={onPressHandler} card={card} />;
          }}
          cardIndex={cardIndex}
          backgroundColor={"#fff"}
          stackSize={10}
          stackSeparation={1}
          overlayLabels={{
            left: {
              title: "NOPE",
              element: <OverlayLabel label="NOPE" color="#E5566D" />,
              style: {
                wrapper: {
                  position: "absolute",
                  right: 10,
                  top: "30%",
                  alignItems: "flex-end",
                },
              },
            },
            right: {
              title: "LIKE",
              element: <OverlayLabel label="LIKE" color="#4CCC93" />,
              style: {
                wrapper: {
                  position: "absolute",
                  left: 10,
                  top: "30%",
                  alignItems: "flex-start",
                },
              },
            },
          }}
          onSwiped={swiped}
          onSwipedAll={onSwipedAll}
          disableBottomSwipe
          disableTopSwipe
          onSwipedLeft={handleDislike}
          onSwipedRight={handleLike}
          key={movies.length} //Very Important--> cards rerendering wont work without this
        ></Swiper>
        {swipes.swipedRight && (
          <View
            style={{
              position: "absolute",
              right: 10,
            }}
          >
            <View style={styles.likeButton}>
              <FontAwesome name="heart" size={30} color="red" />
            </View>
          </View>
        )}
        {swipes.swipedLeft && (
          <View
            style={{
              position: "absolute",
              left: 10,
            }}
          >
            <View style={styles.dislikeButton}>
              <AntDesign name="dislike1" size={30} color="#313B68" />
            </View>
          </View>
        )}

        <Modalize
          ref={modalizeRef}
          snapPoint={500}
          // modalHeight={windowHeight.height - headerHeight - 100}
        >
          <MovieInfoModal info={state} />
        </Modalize>
      </>
    );
  } else if (movies.length === 0 && !loading) {
    if (groupType === "Single") {
      return (
        <View style={styles.noMoviesContainer}>
          <Text style={styles.noMoviesText}>
            No more movies to present for the selected options. You might want
            to go back and select different options!
          </Text>
          <CustomButton
            text="Go Back"
            style={styles.goBackButton}
            onPressHandler={() => {
              navigateBack();
            }}
            textStyle={styles.goBackButtonText}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.noMoviesContainer}>
          <Text style={styles.noMoviesText}>
            No more movies to present for the selected options. You can wait for
            other users to finish swiping.
          </Text>
          <CustomButton
            text="Exit"
            style={styles.goBackButton}
            onPressHandler={() => {
              navigateBack();
            }}
            textStyle={styles.goBackButtonText}
          />
        </View>
      );
    }
  } else {
    return (
      <View style={styles.loadingMovies}>
        <Text style={styles.gettingMovies}>Getting movies...</Text>
        <ActivityIndicator />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  likeButton: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 50,
    shadowOffset: { width: 5, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    marginBottom: 20,
    elevation: 5,
  },
  dislikeButton: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 50,
    shadowOffset: { width: 5, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    marginBottom: 20,
    elevation: 5,
  },
  noMoviesContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  noMoviesText: { fontSize: 20, textAlign: "center" },
  goBackButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#313B68",
    borderRadius: 10,
    padding: 10,
    alignSelf: "center",
    backgroundColor: "transparent",
  },
  goBackButtonText: { color: "#313B68" },
  loadingMovies: { flex: 1, justifyContent: "center" },
  gettingMovies: { padding: 20, fontSize: 20 },
});
