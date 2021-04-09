export const CREATE_SESSION = "creatingsession";
export const END_SESSION = "endingsession";
export const JOIN_SESSION = "joiningsession";
export const UPDATE_PARAMS = "updatingparams";
export const LEAVE_SESSION = "leftsession";
export const START_SESSION = "startingswiping";

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
};
