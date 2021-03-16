import React, { useRef, useState } from "react";
import { ActivityIndicator, useWindowDimensions, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { useGetMovies } from "../../hooks/useGetMovies";
import { Card } from "./Card";
import { Modalize } from "react-native-modalize";
import { MovieInfoModal } from "./MovieInfoModal";
import { useHeaderHeight } from "@react-navigation/stack";

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
          stackSize={3}
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
