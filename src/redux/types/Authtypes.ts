export const SIGN_IN= 'signIn'
export const SIGN_OUT= 'signout'
export const SIGN_UP= 'signup'
export const LOAD_USER= 'loadthem'

export type AuthType= "signIn"|"signout"|"signup"|"loadthem"|null

export type AuthPayload={
    _id:string,
    email:string,
    name:string,
    user_status:string,
    username:string,
    avatar:string
}