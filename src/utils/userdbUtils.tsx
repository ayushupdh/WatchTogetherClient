import AsyncStorage from "@react-native-async-storage/async-storage";

import { server } from "../api/server";
import { setAuthToken } from "./authToken";
type UserType = { name: string; _id: string; avatar: string; online?: boolean };

// Removes typescript error for Formdate on changeUserProfile function
declare global {
  interface FormDataValue {
    uri: string;
    name: string;
    type: string;
  }

  interface FormData {
    append(name: string, value: FormDataValue, fileName?: string): void;
    set(name: string, value: FormDataValue, fileName?: string): void;
  }
}
// ---------------------User routes ------------------------
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

//----------------User Movie Routes----------------
export const getMoviesForUser = async (
  qty: number = 20,
  genres?: string[],
  lang?: string[],
  providers?: string[]
) => {
  let error = null;
  let response = null;
  try {
    const token = await AsyncStorage.getItem("userToken");
    setAuthToken(token);
    const res = await server.get("/users/me/movies", {
      params: {
        qty,
        genres,
        lang,
        providers,
      },
    });
    response = res.data;
    return { response, error };
  } catch (e) {
    error = e;
    return { response, error };
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
    error = e.message;
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

//----------------User Movie Routes Ends----------------

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
export const getFriends = async () => {
  let friends = null;
  let error = null;
  try {
    const token = await AsyncStorage.getItem("userToken");
    setAuthToken(token);
    const response = await server.get("/users/me/friend");
    const friensList = response.data.friends;
    // const groupNames = response.data.groups.map((group: any) => {
    //   return {
    //     name: group.name,
    //     id: group._id,
    //   };
    // });
    friends = friensList;
    return { friends, error };
  } catch (e) {
    error = e.message;
    return { friends, error };
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
export const removeFriend = async (userID: string) => {
  let error = null;
  let response = null;
  try {
    const token = await AsyncStorage.getItem("userToken");
    setAuthToken(token);
    const r = await server.delete("/users/me/friend", {
      params: { id: userID },
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
    setAuthToken(token);
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
export const getUserGroups = async () => {
  let groups = null;
  let error = null;
  try {
    const token = await AsyncStorage.getItem("userToken");
    setAuthToken(token);
    const response = await server.get("/users/me/groups");
    groups = response.data.groups;
    return { groups, error };
  } catch (e) {
    return { groups, error: e.message };
  }
};
export const getOtherUsersInfo = async (userId: string) => {
  let user: any = null;
  let error = null;
  try {
    const token = await AsyncStorage.getItem("userToken");
    setAuthToken(token);
    const res = await server.get("/users/me/otherUserInfo", {
      params: {
        id: userId,
      },
    });
    return { user: res.data, error };
  } catch (error) {
    error = error.message;
    return { user, error };
  }
};

// ---------------------User routes  end------------------------

// ---------------------Group routes------------------------
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

    response = res.data._id;
    return { response, error };
  } catch (e) {
    error = e.message;
    return { response, error };
  }
};

export const getGroupUsers = async (groupID: string) => {
  let response: UserType[] | null = null;
  let error: string | null = null;
  try {
    const token = await AsyncStorage.getItem("userToken");
    setAuthToken(token);
    const res = await server.get(`/groups/${groupID}/users`);
    const users: UserType[] | undefined = res.data.users;
    return { response: users, error };
  } catch (e) {
    return { response, error: e.message };
  }
};

export const addUserToGroup = async (groupId: string, userId: string) => {
  let response = null;
  let error = null;
  try {
    const token = await AsyncStorage.getItem("userToken");
    setAuthToken(token);

    const res = await server.post(`/groups/${groupId}/users`, {
      userId,
    });
    response = "OK";
    return { response, error };
  } catch (e) {
    return { response, error: e.message };
  }
};

export const removeUserFromGroup = async (groupId: string, userId: string) => {
  let response = null;
  let error = null;
  try {
    const token = await AsyncStorage.getItem("userToken");
    setAuthToken(token);
    await server.delete(`/groups/${groupId}/users/${userId}`);
    response = "OK";
    return { response, error };
  } catch (e) {
    console.log(e);
    return { response, error: e.message };
  }
};

export const createSession = async (
  groupID: string,
  userID: string,
  current_session_time: number,
  genres: string[],
  lang: [],
  platform: []
) => {
  let response = null;
  let error = null;
  try {
    const token = await AsyncStorage.getItem("userToken");
    setAuthToken(token);
    const res = await server.post("/groups/session", {
      groupID,
      userID,
      current_session_time,
      genres,
      lang,
      platform,
    });
    response = res.data.session;
    return { response, error };
  } catch (e) {
    error = e.message;
    return { response, error };
  }
};

export const endSession = async (groupID: string) => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    setAuthToken(token);
    await server.post("/groups/session/end", {
      groupID,
    });
    return true;
  } catch (error) {
    error = error.message;
    return false;
  }
};

export const addUserToSession = async (userID: string, sessionID: string) => {
  let response = null;
  let error = null;
  try {
    const token = await AsyncStorage.getItem("userToken");
    setAuthToken(token);
    await server.post("/groups/session/addusers", {
      userID,
      sessionID,
    });
    return { response: true, error };
  } catch (error) {
    error = error.message;
    return { response, error };
  }
};
export const removeUserFromSession = async (
  userID: string,
  sessionID: string
) => {
  let response = null;
  let error = null;
  try {
    const token = await AsyncStorage.getItem("userToken");
    setAuthToken(token);
    await server.post("/groups/session/removeusers", {
      userID,
      sessionID,
    });
    return { response: true, error };
  } catch (error) {
    error = error.message;
    return { response, error };
  }
};
export const getActiveSessionUsers = async (sessionID: string) => {
  let users: string[] | null = null;
  let error: string | null = null;
  try {
    const token = await AsyncStorage.getItem("userToken");
    setAuthToken(token);
    const res = await server.get("/groups/session/users", {
      params: {
        sessionID,
      },
    });
    return { users: res.data.users, error };
  } catch (error) {
    error = error.message;
    return { users, error };
  }
};

export const getSessionInfo = async (sessionID: string) => {
  let response = null;
  let error = null;
  try {
    const token = await AsyncStorage.getItem("userToken");
    setAuthToken(token);
    const res = await server.get("/groups/session/", {
      params: {
        sessionID,
      },
    });
    return { response: res.data, error };
  } catch (error) {
    error = error.message;
    return { response, error };
  }
};

// ---------------------Group routes  end------------------------
