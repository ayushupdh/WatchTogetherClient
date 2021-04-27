// Type Definition for Redux Session Reducer
export const CREATE_SESSION = "creatingsession";
export const END_SESSION = "endingsession";
export const JOIN_SESSION = "joiningsession";
export const UPDATE_PARAMS = "updatingparams";
export const LEAVE_SESSION = "leftsession";
export const START_SESSION = "startingswiping";
export const UPDATE_SESSION_START_TIME = "updatingstarttime";
export const UPDATE_SWIPING = "updatingswiping";
export const UPDATE_TIME = "updatingtime";

// export const ADD_TO_GENRE = "addinggenre";
// export const ADD_TO_LANG = "addingLang";
// export const ADD_TO_PROV = "addingprov";
// export const REMOVE_FROM_GENRE = "removinggenre";
// export const REMOVE_FROM_LANG = "removingLang";
// export const REMOVE_FROM_PROV = "removingprov";

export type CREATE_SESSION_PAYLOADTYPE = {
  sessionType: "Group" | "Single";
  genres?: string[];
  providers?: string[];
  lang?: string[];
  groupID?: string;
  sessionID?: string;
  admin?: string;
  swipingActive?: boolean;
  time?: number | null;
  started_time?: number | null;
};
