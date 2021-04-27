import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuthToken } from "../utils/authToken";

import { server } from "../api/server";

// Custom hook to get group's information
export const useGroupsInfo = (groupId: string) => {
  const [groupInfo, setGroupInfo] = useState<any>();
  const [groupsLoading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("userToken");
        setAuthToken(token);
        const response = await server.get(`/groups/${groupId}`);
        const g = response.data;
        setGroupInfo(g);
        setError(null);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setGroupInfo(null);
        setLoading(false);
      }
    })();
  }, [groupId]);

  return { groupInfo, groupsLoading, error };
};
