import { combineReducers } from 'redux'
import auth, { AuthReducerType } from './authReducers'
import session from './sessionReducers'

export default combineReducers({
    auth,
    session
})