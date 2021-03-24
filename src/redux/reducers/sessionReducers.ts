import {START_SESSION, END_SESSION, START_SESSION_PAYLOADTYPE} from '../types/SessionTypes'
type StateType= {
  sessionType: string |null;
  sessionRunning:boolean;
  sessionParams: { genres?:string[], lang?:string[], providers?:string[]} |null;
}
const initialState:StateType = {
    sessionType:null,
    sessionRunning:false,
    sessionParams:{
        genres:[],
        providers:[],
        lang:[]
    }
}

export default (state = initialState, {type, payload}:{type:string, payload:START_SESSION_PAYLOADTYPE|undefined})=>{
    switch (type) {
        case START_SESSION:
          return {
            sessionType:payload?.sessionType,
            sessionRunning:true,
            sessionParams:{
              genres:payload?.genres,
              providers:payload?.providers,
              lang:payload?.lang
            },
          }
        case END_SESSION:
          return {
            ...initialState
          };
        // case ADD_TO_GENRE:
        //   return {
        //     ...state,
        //     sessionParams:{...state.sessionParams, genres:[...state.sessionParams.genres, payload]}
        // };
        // case ADD_TO_LANG:
        //   return {
        //     ...state,
        //     sessionParams:{...state.sessionParams, lang:[...state.sessionParams.lang, payload]}
        // };
        // case ADD_TO_PROV:
        //     return {
        //       ...state,
        //       sessionParams:{...state.sessionParams, providers:[...state.sessionParams.providers, payload]}
        //   };
        // case REMOVE_FROM_GENRE:
        //   return {
        //     ...state,
        //     sessionParams:{...state.sessionParams, genres:state.sessionParams.genres.filter(el=>el!==payload)}
        // };
        // case REMOVE_FROM_LANG:
        //   return {
        //     ...state,
        //     sessionParams:{...state.sessionParams, lang:state.sessionParams.lang.filter(el=>el!==payload)}
        // };
        // case REMOVE_FROM_PROV:
        //     return {
        //       ...state,
        //       sessionParams:{...state.sessionParams, providers:state.sessionParams.providers.filter(el=>el!==payload)}
        //   };
        default:
          return state;
      }
}