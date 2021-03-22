import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  useWindowDimensions,
  View,
  Text,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { useGetMovies } from "../../hooks/useGetMovies";
import { Card } from "./Card";
import { Modalize } from "react-native-modalize";
import { MovieInfoModal } from "./MovieInfoModal";
import { useHeaderHeight } from "@react-navigation/stack";
import { OverlayLabel } from "./Overlay";
import { addDislikedMovie, addLikedMovie } from "../../utils/userdbUtils";
import { server } from "../../api/server";
import { GroupsNavProps } from "../GroupsView/Navigation/GroupsTypes";

type SwipeCardProps = {};
export const SwipeCard = () => {
  // Store array of movies
  const [movies, setMovies] = useState<any>([]);
  // Store card index
  const [cardIndex, setIndex] = useState(0);
  // Ref for movie info modal
  const modalizeRef = useRef<Modalize>(null);
  // Sets the activity indicator for when the data is loading
  const [loading, setLoading] = useState(true);
  // Holds the movie index of the clicked card
  const [state, setstate] = useState("");
  useEffect(() => {
    reloadCards();
  }, []);

  const reloadCards = async () => {
    const response = await server.get("/movies/getNRandom", {
      params: {
        qty: 15,
        genres: ["Drama", "Action"],
      },
    });
    const m = response.data;
    // This worked previously, but can be memory drain
    // setMovies((prev: any) => prev.concat(m));
    setMovies(m); //THis works with setindex to zero
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Open modal to display movie info
  const onPressHandler = (movieIndex: any) => {
    // Set the movie index of the clicked card
    setstate(movies[movieIndex]._id);
    modalizeRef.current?.open();
  };

  // Get window dimensions for swiping card
  const windowHeight = useWindowDimensions().height;
  const headerHeight = useHeaderHeight();

  // Functions to handle liked and disliked movie cards
  const handleLike = async (index: any) => {
    const movieID = movies[index]["_id"];
    const { response, error } = await addLikedMovie(movieID);
    if (error) {
      console.log(error);
    }
  };

  const handleDislike = async (index: any) => {
    const movieID = movies[index]["_id"];
    const { response, error } = await addDislikedMovie(movieID);
    if (error) {
      console.log(error);
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
          cards={movies ? movies : [{ title: "Loading" }]}
          containerStyle={{
            marginTop: "10%",
            backgroundColor: "#E2EAF4",
          }}
          renderCard={(card) => {
            return <Card onModalOpen={onPressHandler} card={card} />;
          }}
          onTapCard={(index) => onPressHandler(index)}
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
                  flexDirection: "column",
                  alignItems: "flex-end",
                  marginLeft: -30,
                  justifyContent: "flex-start",
                },
              },
            },
            right: {
              title: "LIKE",
              element: <OverlayLabel label="LIKE" color="#4CCC93" />,
              style: {
                wrapper: {
                  flexDirection: "column",
                  marginLeft: 30,
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
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
        <Modalize
          ref={modalizeRef}
          snapPoint={500}
          modalHeight={windowHeight - headerHeight - 100}
        >
          <MovieInfoModal info={state} />
        </Modalize>
      </>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ padding: 20, fontSize: 20 }}>Getting movies...</Text>
        <ActivityIndicator />
      </View>
    );
  }
};
