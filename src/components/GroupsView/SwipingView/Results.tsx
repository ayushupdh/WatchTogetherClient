import { useHeaderHeight } from "@react-navigation/stack";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  View,
  Image,
  Text,
  ActivityIndicator,
  FlatList,
  VirtualizedList,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { useSelector } from "react-redux";
import { getSessionResults } from "../../../utils/userdbUtils";
import { MovieInfoModal } from "../../SwipeCard/MovieInfoModal";
import { UserAvatar } from "../../UserViewModal/UserAvatar";
import { ErrorPopup } from "../../UtilComponents/ErrorPopup";
import { GroupsNavProps } from "../Navigation/GroupsTypes";

type UserType = {
  avatar: string;
  name: string;
  _id: string;
};
type MovieType = {
  _id: string;
  like_count: number;
  liked_by: UserType[];
  poster_path: string;
  movie: {
    _id: string;
    title: string;
    poster_path: string;
    overview: string;
  };
};
export const Results = ({ navigation, route }: GroupsNavProps<"Results">) => {
  // State vars
  const [loading, setLoading] = useState<boolean>(false);
  const [activeUsers, setUsers] = useState<UserType[] | undefined>([]);
  const [movieLists, setMovies] = useState<MovieType[]>([]);
  const [movieIDSelected, setMovieID] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const modalizeRef = useRef<Modalize>();
  // Use Redux to get vars
  const sessionRunning = useSelector(
    ({ session }: { session: { sessionRunning: boolean } }) =>
      session.sessionRunning
  );

  // Show custom Done button based upon whether or not the session is running
  useLayoutEffect(() => {
    if (!sessionRunning) {
      navigation.setOptions({
        gestureEnabled: false,
        headerLeft: () => null,
        headerRight: () => (
          <Text
            onPress={() =>
              route.params.sessionView
                ? navigation.goBack()
                : navigation.popToTop()
            }
            style={{ color: "blue", fontSize: 20, marginRight: 10 }}
          >
            Done
          </Text>
        ),
      });
    }
  }, [navigation, sessionRunning]);

  // if the session is ended
  useEffect(() => {
    let k: number = 1239;
    if (!route.params.sessionView) {
      setMessage("Session Ended");
      k = setTimeout(() => {
        setMessage("");
      }, 2000);
    }
    return () => {
      clearTimeout(k);
    };
  }, [route]);

  // load session result
  useEffect(() => {
    setLoading(true);
    if (route.params.sessionID) {
      getSessionResults(route.params.sessionID).then(({ response, error }) => {
        if (error) {
          setError(error);
        } else {
          const { active_users, movies_liked } = response;
          setMovies(movies_liked);
          setUsers(active_users);
        }
      });
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [route]);

  const openModal = (movieID: string) => {
    setMovieID(movieID);
    modalizeRef.current?.open();
  };
  const height = useWindowDimensions().height;
  const headerHeight = useHeaderHeight();

  // Show user component
  const renderUsers = ({ item }: { item: UserType }) => {
    return (
      <View style={{ marginHorizontal: 4 }}>
        <UserAvatar avatar={item.avatar} borderRadius={50} size={50} />
        {/* <Image style={style.activeUserAvatar} source={{ uri: item.avatar }} /> */}
        <Text style={style.activeUserName}>{item.name.split(" ")[0]}</Text>
      </View>
    );
  };
  // Show movies component
  const renderMovies = ({ item }: { item: MovieType }) => {
    return (
      <Pressable
        onPress={() => {
          openModal(item.movie._id);
        }}
        style={style.moviesContainer}
      >
        <View
          style={{
            backgroundColor:
              activeUsers && item.liked_by.length / activeUsers.length > 0.5
                ? "#51CB20"
                : "#00C6C2",
            width: activeUsers
              ? `${(item.liked_by.length / activeUsers.length) * 100}%`
              : 0,
            padding: 2,
            borderRadius: 10,
          }}
        />
        <View style={style.movieContentContainer}>
          <Image
            style={{
              height: 75,
              width: 75,
              borderRadius: 20,
              marginHorizontal: 5,
            }}
            source={{
              uri: `https://image.tmdb.org/t/p/original${item.movie.poster_path}`,
            }}
          />
          <View style={style.movieTextContainer}>
            <Text style={style.title} numberOfLines={1}>
              {item.movie.title}
            </Text>
            <Text style={style.overview} numberOfLines={2}>
              {item.movie.overview}
            </Text>

            <View style={style.movieUserAvatarContainer}>
              {item.liked_by.map((item: UserType) => {
                return (
                  <View key={item._id} style={{ marginHorizontal: 2 }}>
                    <UserAvatar
                      avatar={item.avatar}
                      borderRadius={50}
                      size={25}
                    />
                  </View>

                  // <Image
                  //   key={item._id}
                  //   style={style.movieUserAvatar}
                  //   source={{ uri: item.avatar }}
                  // />
                );
              })}
            </View>
          </View>
        </View>
      </Pressable>
    );
  };
  // if (loading) {
  //   return (
  //     <>
  //       <Text style={style.movieslikedText}>Movies Liked</Text>

  //       {message !== "" && <ErrorPopup error={message} />}
  //     </>
  //   );
  // }

  return (
    <View style={style.container}>
      {!route.params.sessionView && (
        <View>
          <Text style={style.active}>Active Users</Text>
          <FlatList
            contentContainerStyle={{ marginLeft: 15 }}
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={renderUsers}
            data={activeUsers}
            keyExtractor={(item: UserType) => item._id}
            horizontal
          />
        </View>
      )}

      <Text style={style.movieslikedText}>
        {route.params.sessionView ? "Movies Liked" : "Top 5 movies liked"}
      </Text>
      {loading ? (
        <ActivityIndicator
          style={{ flex: 1, backgroundColor: "#E2EAF4" }}
          size="large"
          color={"#313B68"}
        />
      ) : movieLists.length !== 0 ? (
        <VirtualizedList
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={renderMovies}
          data={movieLists}
          getItem={(data, index) => data[index]}
          getItemCount={(data) => data.length}
          keyExtractor={(item: MovieType) => item._id}
        />
      ) : (
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={{ color: "red", fontSize: 20 }}>
            No movies were liked in this session
          </Text>
        </View>
      )}
      {message !== "" && !sessionRunning && (
        <ErrorPopup error={message} color="#313B68" />
      )}

      <Modalize
        rootStyle={{ zIndex: 10 }}
        ref={modalizeRef}
        snapPoint={500}
        modalHeight={height - headerHeight - 50}
      >
        <MovieInfoModal info={movieIDSelected} />
      </Modalize>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#E2EAF4",
  },
  active: {
    color: "#555",
    fontSize: 20,
    fontWeight: "500",
    padding: 10,
  },
  movieslikedText: {
    color: "#555",
    fontSize: 20,
    fontWeight: "500",
    padding: 10,
  },
  activeUserAvatar: {
    height: 55,
    width: 55,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  activeUserName: { alignSelf: "center", fontSize: 10 },
  moviesContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  movieContentContainer: {
    flexDirection: "row",
    padding: 10,
  },
  movieTextContainer: { overflow: "hidden", flex: 1, marginLeft: 10 },
  title: {
    flexGrow: 1,
    overflow: "hidden",
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 5,
  },
  overview: { flexGrow: 1, overflow: "hidden", fontSize: 12 },
  movieUserAvatarContainer: {
    marginTop: 20,
    flexDirection: "row",
  },
  movieUserAvatar: {
    height: 25,
    width: 25,
    borderRadius: 50,
    marginHorizontal: 5,
  },
});
