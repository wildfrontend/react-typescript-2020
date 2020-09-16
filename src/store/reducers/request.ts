import { createReducer, createAction, PayloadAction } from "@reduxjs/toolkit"
import { HttpStatusCode } from "api/HttpStatusCode"

export type PageState = {
    status: HttpStatusCode | null,
    message: string

}
const initState: PageState = {
    status: null,
    message: ''
}
export const getRequestStatus: any = createAction('request/status')

export default createReducer(initState, {
    [getRequestStatus]: (state, action: PayloadAction<PageState>) => {
        console.log(action)
        state.status = action.payload.status
        state.message = action.payload.message
    }
})