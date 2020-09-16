import { createAction, createReducer } from "@reduxjs/toolkit";
import { RootState } from 'store/rootReducer'

export const loginAuth: any = createAction('auth/login')
export const logoutAuth: any = createAction('auth/logout')

export type AuthState = {
    isAuth: boolean,
    accessToken: string
}

const initState: AuthState = {
    isAuth: false,
    accessToken: ""
}

export const selectAuth = (state: RootState) => state.auth

export default createReducer(initState, {
    [loginAuth]: (state, action) => {
        console.log(action)
        state.isAuth = true
        state.accessToken = "Bearer " + action.payload
    },
    [logoutAuth]: (state, action) => {
        state.isAuth = false
    }
})