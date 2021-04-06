import { Dispatch } from "redux";
import { emitter } from "../../components/io/io.emit";
import {
  END_SESSION,
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
    console.log("1");
    let { session, admin } = await emitter.startSession(
      payload.groupID,
      0,
      payload.genres,
      payload.lang,
      payload.providers
    );
    console.log(session);
    console.log("Dispatching");

    dispatch({
      type: START_SESSION,
      payload: {
        sessionType: "Group",
        sessionID: session,
        admin,
        ...payload,
      },
    });

    console.log("Dispatched");
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

export const joinSessionPopulate = (
  payload: {
    groupID: string;
    sessionID: string;
  },
  dispatch: Dispatch<any>
) => {
  dispatch({
    type: START_SESSION,
    payload: {
      sessionType: "Group",
      sessionRunning: true,
      ...payload,
    },
  });
};

export const updateParams = (
  payload: { genres: string[]; providers: string[]; lang: string[] },
  dispatch: Dispatch<any>
) => {
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