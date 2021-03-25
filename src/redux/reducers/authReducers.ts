import { SIGN_IN, SIGN_UP, SIGN_OUT, LOAD_USER, AuthType } from "../types/Authtypes";
const initialState = {
    user:null,
    userToken:null
}

export default (user = initialState, {type, payload}:{type:AuthType, payload:any})=>{
    switch (type) {
        case LOAD_USER:
          return {
            user:payload.user,
            userToken:payload.token
          }
        case SIGN_IN:
          return {
            user:payload.user,
            userToken:payload.token
          };
        case SIGN_UP:
          return {
            user: payload.user,
            userToken:payload.token
          };
        case SIGN_OUT:
          return initialState;
        default:
          return user;
      }
}