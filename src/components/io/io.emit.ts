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
  joinSession: (
    sessionID: string,
    genres: string[],
    lang: string[],
    providers: string[]
  ) => {
    return new Promise<any>((resolve, reject) => {
      socket.emit(
        "join-session",
        { sessionID, genres, lang, providers },
        (args: any) => {
          if (args.error) {
            reject(args.error);
          }
          resolve(args.session);
        }
      );
    });
  },
  endSession: () => {
    socket.emit("end-session");
  },
  setID: (_id: string) => {
    socket.emit("set-id", { _id });
  },
};
