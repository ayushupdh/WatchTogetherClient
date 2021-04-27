import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuthToken } from "../utils/authToken";

import { server } from "../api/server";

// Custom hook to get groups's session information
export const useGetGroupsSession = (groupId: string) => {
  const [sessionList, setSessionList] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("userToken");
        setAuthToken(token);
        const response = await server.get(`/groups/${groupId}/session`);
        const g = response.data;
        setSessionList(g);
        setError(null);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setSessionList(null);
        setLoading(false);
      }
    })();
  }, [groupId]);

  return { sessionList, loading, error };
};
