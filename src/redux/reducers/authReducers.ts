import { SIGN_IN, SIGN_UP, SIGN_OUT, LOAD_USER } from "../types/Authtypes";
const initialState = {
    user:null
}

export default (user = initialState, {type, payload})=>{
    switch (type) {
        case LOAD_USER:
          return {
            user:payload.user,
          }
        case SIGN_IN:
          return {
            user:payload.user,
          };
        case SIGN_UP:
          return {
            user: payload.user,
          };
        case SIGN_OUT:
          return {
            user: null,
          };
        default:
          return user;
      }
}