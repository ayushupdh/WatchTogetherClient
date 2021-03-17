import React, { useRef, useState } from "react";
import { ActivityIndicator, useWindowDimensions, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { useGetMovies } from "../../hooks/useGetMovies";
import { Card } from "./Card";
import { Modalize } from "react-native-modalize";
import { MovieInfoModal } from "./MovieInfoModal";
import { useHeaderHeight } from "@react-navigation/stack";
import { OverlayLabel } from "./Overlay";
import { addDislikedMovie, addLikedMovie } from "../../utils/userdbUtils";

type SwipeCardProps = {};
export const SwipeCard = (props: SwipeCardProps) => {
  const { movies, error } = useGetMovies();
  const modalizeRef = useRef<Modalize>(null);
  const [state, setstate] = useState();

  const onPressHandler = (movieIndex: any) => {
    setstate(movies[movieIndex]._id);
    modalizeRef.current?.open();
  };

  const windowHeight = useWindowDimensions().height;
  const headerHeight = useHeaderHeight();

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

  if (movies && movies.length !== 0) {
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
          cardIndex={0}
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
          disableBottomSwipe
          onSwipedLeft={handleDislike}
          onSwipedRight={handleLike}
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
    return <ActivityIndicator style={{ flex: 1 }} />;
  }
};
