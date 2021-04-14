import {
  CREATE_SESSION,
  END_SESSION,
  CREATE_SESSION_PAYLOADTYPE,
  UPDATE_PARAMS,
  JOIN_SESSION,
  LEAVE_SESSION,
  START_SESSION,
  UPDATE_SESSION_START_TIME,
  UPDATE_SWIPING,
  UPDATE_TIME,
} from "../types/SessionTypes";
export type SessionType = {
  sessionType: string | null;
  sessionRunning: boolean;
  sessionID?: string | null;
  groupID: string | null;
  admin: string | null;
  swipingActive: boolean;
  sessionParams: {
    time: number | null;
    started_time: number | null;
    genres?: string[];
    lang?: string[];
    providers?: string[];
  } | null;
};
const initialState: SessionType = {
  sessionType: null,
  sessionRunning: false,
  groupID: null,
  sessionID: null,
  admin: null,
  swipingActive: false,
  sessionParams: {
    started_time: null,
    time: null,
    genres: [],
    providers: [],
    lang: [],
  },
};

export default (
  state = initialState,
  {
    type,
    payload,
  }: { type: string; payload: CREATE_SESSION_PAYLOADTYPE | undefined }
) => {
  switch (type) {
    case CREATE_SESSION:
      return {
        sessionType: payload?.sessionType,
        sessionRunning: true,
        groupID: payload?.groupID,
        sessionID: payload?.sessionID,
        admin: payload?.admin,
        swipingActive: false,
        sessionParams: {
          started_time: null,
          time: payload?.time,
          genres: payload?.genres,
          providers: payload?.providers,
          lang: payload?.lang,
        },
      };
    case JOIN_SESSION:
      return {
        sessionType: payload?.sessionType,
        sessionRunning: true,
        groupID: payload?.groupID,
        sessionID: payload?.sessionID,
        admin: payload?.admin,
        swipingActive: payload?.swipingActive,
        sessionParams: {
          ...state.sessionParams,
          started_time: payload?.started_time,
          time: payload?.time,
          genres: payload?.genres,
          providers: payload?.providers,
          lang: payload?.lang,
        },
      };
    case START_SESSION:
      return {
        ...state,
        swipingActive: true,
      };
    case UPDATE_PARAMS:
      return {
        ...state,
        sessionParams: {
          ...state.sessionParams,
          time: payload?.time,
          genres: payload?.genres,
          providers: payload?.providers,
          lang: payload?.lang,
        },
      };
    case UPDATE_SESSION_START_TIME:
      return {
        ...state,
        sessionParams: {
          ...state.sessionParams,
          started_time: payload?.started_time,
        },
      };
    case UPDATE_SWIPING:
      return {
        ...state,
        swipingActive: payload?.swipingActive,
        sessionParams: {
          ...state.sessionParams,
          started_time: payload?.started_time,
        },
      };
    case UPDATE_TIME:
      return {
        ...state,
        sessionParams: {
          ...state.sessionParams,
          time: payload?.time,
        },
      };

    case END_SESSION:
      return {
        ...initialState,
      };
    case LEAVE_SESSION:
      return {
        ...initialState,
      };
    // case ADD_TO_GENRE:
    //   return {
    //     ...state,
    //     sessionParams:{...state.sessionParams, genres:[...state.sessionParams.genres, payload]}
    // };
    // case ADD_TO_LANG:
    //   return {
    //     ...state,
    //     sessionParams:{...state.sessionParams, lang:[...state.sessionParams.lang, payload]}
    // };
    // case ADD_TO_PROV:
    //     return {
    //       ...state,
    //       sessionParams:{...state.sessionParams, providers:[...state.sessionParams.providers, payload]}
    //   };
    // case REMOVE_FROM_GENRE:
    //   return {
    //     ...state,
    //     sessionParams:{...state.sessionParams, genres:state.sessionParams.genres.filter(el=>el!==payload)}
    // };
    // case REMOVE_FROM_LANG:
    //   return {
    //     ...state,
    //     sessionParams:{...state.sessionParams, lang:state.sessionParams.lang.filter(el=>el!==payload)}
    // };
    // case REMOVE_FROM_PROV:
    //     return {
    //       ...state,
    //       sessionParams:{...state.sessionParams, providers:state.sessionParams.providers.filter(el=>el!==payload)}
    //   };
    default:
      return state;
  }
};
