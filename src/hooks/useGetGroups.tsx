import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuthToken } from "../utils/authToken";

import { server } from "../api/server";

// Custom hook to get user's groups list
export const useGetGroups = () => {
  const [groups, setGroups] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        setAuthToken(token);
        const response = await server.get("/users/me/groups");
        const groupNames = response.data.groups.map((group: any) => {
          return {
            name: group.name,
            id: group._id,
          };
        });
        setGroups(groupNames);
        setError(null);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);
  return { groups, error };
};
