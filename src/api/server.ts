import axios from "axios";
let url = "https://watch-together-backend.herokuapp.com";

// const url= 'http://localhost:4000'
export const server = axios.create({
  baseURL: url,
});
