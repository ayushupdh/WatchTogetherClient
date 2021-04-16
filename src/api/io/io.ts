import socketIO from "socket.io-client";
let url = `https://watch-together-backend.herokuapp.com/sessions`;

export const socketClient = socketIO(url, {
  transports: ["websocket"],
  jsonp: false,
});
