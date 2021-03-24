import AsyncStorage from "@react-native-async-storage/async-storage";

import { server } from "../api/server";
import { setAuthToken } from "./authToken";

export const getLikedMovies = async () => {
  let error = null;
  let response = null;
  try {
    const token = await AsyncStorage.getItem("userToken");
    setAuthToken(token);
    const res = await server.get("/users/me/likedMovies");
    response = res.data;
    return { response, error };
  } catch (e) {
    error = e;
    return { response, error };
  }
};

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

export const searchUsers = async (username: string) => {
  let error = null;
  let response = null;
  try {
    const token = await AsyncStorage.getItem("userToken");
    setAuthToken(token);
    const r = await server.get("/users/search", { params: { username } });
    response = r.data;
    return { response, error };
  } catch (e) {
    error = e.message;
    return { response, error };
  }
};

export const addFriend = async (username: string) => {
  let error = null;
  let response = null;
  try {
    const token = await AsyncStorage.getItem("userToken");
    setAuthToken(token);
    const r = await server.patch("/users/me/friend", {
      friend: username,
    });
    response = "OK";
    return { response, error };
  } catch (e) {
    error = e.message;
    return { response, error };
  }
};

export const searchFriends = async (username: string) => {
  let error = null;
  let response = null;
  try {
    const token = await AsyncStorage.getItem("userToken");
    setAuthToken(token);
    const res = await server.get("/users/me/searchFriend", {
      params: {
        username,
      },
    });
    response = res.data;
    return { response, error };
  } catch (e) {
    error = e.message;
    return { response, error };
  }
};

export const createGroup = async (groupName: string, time: string) => {
  let error = null;
  let response = null;
  try {
    const t = time.split(" ");
    const sessiontime = parseInt(t[0], 10) * 60 + parseInt(t[1], 10);
    const token = await AsyncStorage.getItem("userToken");
    setAuthToken(token);
    const res = await server.post("/groups/create", {
      name: groupName,
      current_session_time: sessiontime,
    });
    response = "OK";
    return { response, error };
  } catch (e) {
    error = e.message;
    return { response, error };
  }
};
