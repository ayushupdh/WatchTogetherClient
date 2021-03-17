import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuthToken } from "../utils/authToken";

import { server } from "../api/server";

export const useGroupsInfo = (groupId: string) => {
  const [groupInfo, setGroupInfo] = useState<any>();
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        setAuthToken(token);
        const response = await server.get(`/groups/${groupId}`);
        const g = response.data;
        setGroupInfo(g);
        setError(null);
      } catch (e) {
        setError(e.message);
        setGroupInfo(null);
      }
    })();
  }, [groupId]);

  return { groupInfo, error };
};
