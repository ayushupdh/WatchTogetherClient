import { server } from "../api/server";

// Function to set token to axios handler
export const setAuthToken = (token?: string | null) => {
  if (token) {
    server.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete server.defaults.headers.common["Authorization"];
  }
};
