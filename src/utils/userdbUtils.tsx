import AsyncStorage from "@react-native-async-storage/async-storage";

import { server } from "../api/server";
import { setAuthToken } from "./authToken";

export const loadUser = async () => {
  let user: any = null;
  let error = null;
  try {
    const token = await AsyncStorage.getItem("userToken");
    setAuthToken(token);
    const res = await server.get("/users/me");
    return { user: [res.data, token], error };
  } catch (error) {
    // If the user is unauthorised first time, remove the authtoken to reduce api calls
    if (error.response && error.response.status === 401) {
      await AsyncStorage.removeItem("userToken");
      error = error.response.status;
      return { user, error };
    }
    error = error.message;
    return { user, error };
  }
};

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

export const changeUserInfo = async (
  name?: string,
  username?: string,
  email?: string
) => {
  let error = null;
  let response = null;
  let changes = {};
  try {
    if (name) {
      changes = { ...changes, name };
    }
    if (username) {
      changes = { ...changes, username };
    }
    if (email) {
      changes = { ...changes, email };
    }
    const token = await AsyncStorage.getItem("userToken");
    const res = await server.patch("/users/me", changes);
    return { response, error };
  } catch (e) {
    if (e.response && e.response.data && e.response.data.usernameError) {
      error = e.response.data.usernameError;
      return { response, error: { usernameError: error } };
    }
    if (e.response && e.response.data && e.response.data.emailError) {
      error = e.response.data.emailError;
      return { response, error: { emailError: error } };
    }
    error = e.message;

    return { response, error };
  }
};

export const changeUserProfile = async (data: { uri: string }) => {
  const token = await AsyncStorage.getItem("userToken");
  let response = null;
  let error = null;
  try {
    // Need all this
    let uri = data.uri;
    let uriParts = uri.split(".");
    let fileType = uriParts[uriParts.length - 1];
    let formData = new FormData();

    formData.append("avatar", {
      uri: data.uri,
      name: `avatar.${fileType}`,
      type: `image/${fileType}`,
    });

    setAuthToken(token);
    const res = await server.patch("/users/me/avatar", formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    response = "OK";
    return { response, error };
  } catch (e) {
    console.log(e);
    return { response, error };
  }
};