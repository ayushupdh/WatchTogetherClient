import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuthToken } from "../utils/authToken";

import { server } from "../api/server";

export const useGetFriends = (get: string) => {
  const [friends, setFriends] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
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
        setFriends(friensList);
        setError(null);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, [get]);
  return { friends, error };
};
