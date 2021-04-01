import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  useWindowDimensions,
  View,
  Text,
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { Card } from "./Card";
import { Modalize } from "react-native-modalize";
import { MovieInfoModal } from "./MovieInfoModal";
import { useHeaderHeight } from "@react-navigation/stack";
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

type SwipeCardProps = {};
export const SwipeCard = ({
  onMovieFinish,
  navigateBack,
}: {
  onMovieFinish: () => void;
  navigateBack: () => void;
}) => {
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
  useEffect(() => {
    reloadCards();
  }, []);

  const reloadCards = async () => {
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
    setTimeout(() => {
      setLoading(false);
    }, 200);
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
              top: (windowHeight - headerHeight) / 2.5,
            }}
          >
            <View
              style={{
                padding: 10,
                backgroundColor: "white",
                borderRadius: 50,
                shadowOffset: { width: 5, height: 4 },
                shadowColor: "#000",
                shadowOpacity: 0.4,
                marginBottom: 20,
                elevation: 5,
              }}
            >
              <FontAwesome name="heart" size={30} color="red" />
            </View>
          </View>
        )}
        {swipes.swipedLeft && (
          <View
            style={{
              position: "absolute",
              left: 10,
              top: (windowHeight - headerHeight) / 2.5,
            }}
          >
            <View
              style={{
                padding: 10,
                backgroundColor: "white",
                borderRadius: 50,
                shadowOffset: { width: 5, height: 4 },
                shadowColor: "#000",
                shadowOpacity: 0.4,
                marginBottom: 20,
                elevation: 5,
              }}
            >
              <AntDesign name="dislike1" size={30} color="#313B68" />
            </View>
          </View>
        )}

        <Modalize
          ref={modalizeRef}
          snapPoint={500}
          modalHeight={windowHeight - headerHeight - 100}
        >
          <MovieInfoModal info={state} />
        </Modalize>
      </>
    );
  } else if (movies.length === 0 && !loading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}
      >
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          No more movies to present for the selected options. You might want to
          go back and select different options!
        </Text>
        <CustomButton
          text="Go Back"
          style={{
            marginTop: 10,
            borderWidth: 1,
            borderColor: "#313B68",
            borderRadius: 10,
            padding: 10,
            alignSelf: "center",
            backgroundColor: "transparent",
          }}
          onPressHandler={() => {
            navigateBack();
          }}
          textStyle={{ color: "#313B68" }}
        />
      </View>
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
