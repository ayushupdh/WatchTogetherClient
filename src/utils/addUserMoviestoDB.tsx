import AsyncStorage from "@react-native-async-storage/async-storage";

import { server } from "../api/server";
import { setAuthToken } from "./authToken";

export const addLikedMovie = async (movieId: string) => {
  let error = null;
  let response = null;
  try {
    const token = await AsyncStorage.getItem("userToken");
    setAuthToken(token);
    await server.post("/users/me/likedMovies", { movieId });
    response = "OK";
    return { response, error };
  } catch (e) {
    error = e;
    return { response, error };
  }
};

export const addDislikedMovie = async (movieId: string) => {
  let error = null;
  let response = null;
  try {
    const token = await AsyncStorage.getItem("userToken");
    setAuthToken(token);
    await server.post("/users/me/dislikedMovies", { movieId });
    response = "OK";
    return { response, error };
  } catch (e) {
    error = e;
    return { response, error };
  }
};
