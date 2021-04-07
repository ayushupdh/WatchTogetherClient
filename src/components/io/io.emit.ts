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

  setID: (_id: string) => {
    socket.emit("set-id", { _id });
  },
};
