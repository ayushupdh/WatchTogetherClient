import { socketClient as socket } from "./io";
export const emitter = {
  startSession: (
    groupID: string,
    current_session_time: number | undefined = 0,
    genres: string[],
    lang: string[],
    providers: string[]
  ) => {
    return new Promise<any>((resolve, reject) => {
      socket.emit(
        "start-session",
        { groupID, current_session_time, genres, lang, providers },
        (args: any) => {
          if (args.error) {
            reject(args.error);
          }
          resolve({ session: args.session, admin: args.admin });
        }
      );
    });
  },
  joinSession: (sessionID: string) => {
    return new Promise<any>((resolve, reject) => {
      socket.emit("join-session", { sessionID }, (args: any) => {
        if (!args) {
          reject(args);
        }
        resolve(args);
      });
    });
  },
  endSession: () => {
    socket.emit("end-session");
  },
  updateParams: (
    sessionID: string,
    genre: string[],
    lang: string[],
    providers: string[]
  ) => {
    return new Promise<any>((resolve, reject) => {
      const params = { genre, lang, providers };
      socket.emit("update-params", { sessionID, params }, (args: any) => {
        if (!args) {
          reject(args);
        }
        resolve(args);
      });
    });
  },

  setID: (_id: string) => {
    socket.emit("set-id", { _id });
  },
};
