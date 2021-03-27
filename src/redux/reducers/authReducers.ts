import { SIGN_IN, SIGN_UP, SIGN_OUT, LOAD_USER, AuthType, AuthPayload } from "../types/Authtypes";
const initialState = {
    user:null,
    userToken:null
}

export default (user = initialState, {type, payload}:{type:AuthType, payload:{user:AuthPayload, token:string}|null})=>{
    switch (type) {
        case LOAD_USER:
          return {
            user:payload?.user,
            userToken:payload?.token
          }
        case SIGN_IN:
          return {
            user:payload?.user,
            userToken:payload?.token
          };
        case SIGN_UP:
          return {
            user: payload?.user,
            userToken:payload?.token
          };
        case SIGN_OUT:
          return initialState;
        default:
          return user;
      }
}