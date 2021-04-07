import { Dispatch } from "redux";
import { emitter } from "../../components/io/io.emit";
import {
  END_SESSION,
  JOIN_SESSION,
  START_SESSION,
  UPDATE_PARAMS,
} from "../types/SessionTypes";

export const startGroupSession = async (
  payload: {
    groupID: string;
    sessionRunning: boolean;
    genres: string[];
    providers: string[];
    lang: string[];
  },
  dispatch: Dispatch<any>
) => {
  try {
    let { session, admin, error } = await emitter.startSession(
      payload.groupID,
      0,
      payload.genres,
      payload.lang,
      payload.providers
    );
    if (error) {
      console.log(error);
    }

    dispatch({
      type: START_SESSION,
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
export const startSingleSession = (
  payload: { genres: string[]; providers: string[]; lang: string[] },
  dispatch: Dispatch<any>
) => {
  dispatch({
    type: START_SESSION,
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
  payload: { genres: string[]; providers: string[]; lang: string[] },
  dispatch: Dispatch<any>
) => {
  await emitter.updateParams(
    sessionID,
    payload.genres,
    payload.lang,
    payload.providers
  );
  dispatch({
    type: UPDATE_PARAMS,
    payload,
  });
};
export const endGroupSession = (dispatch: Dispatch<any>) => {
  dispatch({
    type: END_SESSION,
  });
  emitter.endSession();
};
export const endSingleSession = (dispatch: Dispatch<any>) => {
  dispatch({
    type: END_SESSION,
  });
};
