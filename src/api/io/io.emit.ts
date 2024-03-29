import { socketClient as socket } from "./io";
export const emitter = {
  createSession: (
    groupID: string,
    current_session_time: number | undefined = 0,
    genres: string[],
    lang: string[],
    providers: string[]
  ) => {
    return new Promise<any>((resolve, reject) => {
      socket.emit(
        "create-session",
        {
          groupID,
          current_session_time,
          genres,
          lang,
          providers,
        },
        ({
          session,
          admin,
          error,
        }: {
          session: string;
          admin: string;
          error: string;
        }) => {
          if (error) {
            reject(error);
          }
          resolve({ session, admin });
        }
      );
    });
  },
  joinSession: (sessionID: string) => {
    return new Promise<any>((resolve, reject) => {
      socket.emit("join-session", { sessionID }, ({ admin, error }: any) => {
        if (error) {
          reject(error);
        }
        resolve(admin);
      });
    });
  },
  startSession: (sessionID: string) => {
    return new Promise<any>((resolve) => {
      socket.emit("start-session", { sessionID }, (time: number) => {
        resolve(time);
      });
    });
  },
  endSession: (groupID: string, sessionID: string) => {
    socket.emit("end-session", { groupID, sessionID });
  },
  updateParams: (
    sessionID: string,
    genre: string[],
    lang: string[],
    providers: string[],
    time: number
  ) => {
    return new Promise<any>((resolve, reject) => {
      const params = { genre, lang, providers, time };
      socket.emit("update-params", { sessionID, params }, (args: any) => {
        if (!args) {
          reject(args);
        }
        resolve(args);
      });
    });
  },
  getMoviesForSession: (sessionID: string, currentIndex: number) => {
    return new Promise<any>((resolve, reject) => {
      socket.emit(
        "get-movies",
        { sessionID, currentIndex },
        ({ movies, error }: any) => {
          if (error) {
            reject(error);
          }
          resolve(movies);
        }
      );
    });
  },
  addToLikedMovies: (sessionID: string, movieID: string) => {
    return new Promise<any>((resolve) => {
      socket.emit(
        "add-liked-movies",
        { sessionID, movieID },
        (result: boolean) => {
          if (result) {
            resolve(1);
          }
        }
      );
    });
  },
  friendAddedToGroup: (sessionID: string) => {
    socket.emit("friend-added-to-group", sessionID);
  },
  friendRemovedFromGroup: (sessionID: string) => {
    socket.emit("friend-removed-from-group", sessionID);
  },
  leaveSession: (sessionID: string) => {
    socket.emit("leave-session", { sessionID });
  },
  setID: (_id: string) => {
    socket.emit("set-id", { _id });
  },
};
