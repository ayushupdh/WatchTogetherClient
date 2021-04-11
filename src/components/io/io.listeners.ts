import { socketClient } from "./io";

export const listenforUsers = () => {
  socketClient.on("user-joined", (userID) => {
    console.log(userID);
  });
};
