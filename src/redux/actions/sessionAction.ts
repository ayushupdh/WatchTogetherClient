import { Dispatch } from "redux";
import { emitter } from "../../components/io/io.emit";
import {
  END_SESSION,
  JOIN_SESSION,
  LEAVE_SESSION,
  CREATE_SESSION,
  UPDATE_PARAMS,
  START_SESSION,
} from "../types/SessionTypes";

export const startGroupSession = async (
  payload: {
    groupID: string;
    sessionRunning: boolean;
    genres: string[];
    providers: string[];
    lang: string[];
    time: number;
  },
  dispatch: Dispatch<any>
) => {
  try {
    let { session, admin, error } = await emitter.createSession(
      payload.groupID,
      payload.time,
      payload.genres,
      payload.lang,
      payload.providers
    );
    if (error) {
      console.log(error);
    }

    dispatch({
      type: CREATE_SESSION,
      payload: {
        sessionType: "Group",
        sessionID: session,
        admin,
        ...payload,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export const swipingStarted = (dispatch: Dispatch<any>) => {
  dispatch({
    type: START_SESSION,
  });
};
export const startSingleSession = (
  payload: { genres: string[]; providers: string[]; lang: string[] },
  dispatch: Dispatch<any>
) => {
  dispatch({
    type: CREATE_SESSION,
    payload: {
      sessionType: "Single",
      ...payload,
    },
  });
};

export const joinSessionPopulate = async (
  payload: {
    groupID: string;
    sessionID: string;
    swipingActive: boolean;
    time: number;
    started_time: number;
  },
  dispatch: Dispatch<any>
) => {
  try {
    const admin = await emitter.joinSession(payload.sessionID);
    dispatch({
      type: JOIN_SESSION,
      payload: {
        sessionType: "Group",
        sessionRunning: true,
        admin: admin,
        ...payload,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateParams = async (
  sessionID: string,
  payload: {
    genres: string[];
    providers: string[];
    lang: string[];
    time: number;
  },
  dispatch: Dispatch<any>
) => {
  await emitter.updateParams(
    sessionID,
    payload.genres,
    payload.lang,
    payload.providers,
    payload.time
  );
  dispatch({
    type: UPDATE_PARAMS,
    payload,
  });
};
export const endGroupSession = (
  groupId: string,
  sessionID: string,
  dispatch: Dispatch<any>
) => {
  dispatch({
    type: END_SESSION,
  });
  emitter.endSession(groupId, sessionID);
};
export const leaveGroupSession = (
  sessionID: string,
  dispatch: Dispatch<any>
) => {
  dispatch({
    type: LEAVE_SESSION,
  });
  emitter.leaveSession(sessionID);
};
export const endSingleSession = (dispatch: Dispatch<any>) => {
  dispatch({
    type: END_SESSION,
  });
};
