import {START_SESSION, END_SESSION, ADD_TO_GENRE, ADD_TO_LANG, ADD_TO_PROV, REMOVE_FROM_GENRE, REMOVE_FROM_LANG, REMOVE_FROM_PROV} from '../types/SessionTypes'
const initialState:  {sessionType:string |null,sessionParams: { genres?:string[], lang?:string[], providers?:string[]} |null}= {
    sessionType:null,
    sessionParams:{
        genres:[],
        providers:[],
        lang:[]
    }
}

export default (state = initialState, {type, payload})=>{
    switch (type) {
        case START_SESSION:
          return {
            sessionType:payload,
            sessionParams:state.sessionParams
          }
        case END_SESSION:
          return {
            ...initialState
          };
        case ADD_TO_GENRE:
          return {
            ...state,
            sessionParams:{...state.sessionParams, genres:[...state.sessionParams.genres, payload]}
        };
        case ADD_TO_LANG:
          return {
            ...state,
            sessionParams:{...state.sessionParams, lang:[...state.sessionParams.lang, payload]}
        };
        case ADD_TO_PROV:
            return {
              ...state,
              sessionParams:{...state.sessionParams, providers:[...state.sessionParams.providers, payload]}
          };
          case REMOVE_FROM_GENRE:
            return {
              ...state,
              sessionParams:{...state.sessionParams, genres:state.sessionParams.genres.filter(el=>el!==payload)}
          };
          case REMOVE_FROM_LANG:
            return {
              ...state,
              sessionParams:{...state.sessionParams, lang:state.sessionParams.lang.filter(el=>el!==payload)}
          };
          case REMOVE_FROM_PROV:
            return {
              ...state,
              sessionParams:{...state.sessionParams, providers:state.sessionParams.providers.filter(el=>el!==payload)}
          };

        default:
          return state;
      }
}