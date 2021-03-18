import { combineReducers } from 'redux'
import auth from './authReducers'
import session from './sessionReducers'

export default combineReducers({
    auth,
    session
})