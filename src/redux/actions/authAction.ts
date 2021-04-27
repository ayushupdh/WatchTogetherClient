import { server } from "../../api/server";
import { SIGN_IN, SIGN_UP, SIGN_OUT } from "../types/Authtypes";

// Experimental --- DO not use ----
export const loginuser = (loginInfo) => async (dispatch, getState) => {
  try {
    const res = await server.post("/users/login", loginInfo);

    const userToken = res.data.token;
    // await AsyncStorage.setItem('userToken', userToken);
    dispatch({
      type: SIGN_IN,
      payload: {
        user: {
          username: res.data.user.name,
        },
      },
    });
  } catch (e) {
    return null;
  }
};

export const logoutuser = (loginInfo) => async (dispatch, getState) => {};
export const singupuser = (loginInfo) => async (dispatch, getState) => {};
