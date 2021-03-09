import axios from "axios";
import { server } from "../api/server";

export const setAuthToken = (token?:string|null) => {
  if (token) {
    server.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete server.defaults.headers.common["Authorization"];
  }
};