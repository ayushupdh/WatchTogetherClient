import { socketClient } from "./io";
export const initListeners = () => {
  socketClient.on("connect", () => {});
  // socketClient.onAny((...args) => {
  //   console.log(args);
  // });
};

export const listenforUsers = () => {
  socketClient.on("user-joined", (userID) => {
    console.log(userID);
  });
};
