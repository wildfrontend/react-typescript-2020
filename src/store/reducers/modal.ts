import { createAction, createAsyncThunk, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/rootReducer";


export type ModelState = {
    isOpen?: boolean
}
const initState = {
    isOpen: false,
    message: ''
}
export const selectModal = (state: RootState) => state.modal

export const openModal: any = createAction('modal/open')
export const closeModal: any = createAction('modal/close')

export const handleModalCallback = createAsyncThunk('model/callback', async (callback: any) => {
    if (callback) callback()
})
export default createReducer(
    initState, {
    [openModal]: (state, action: PayloadAction<{ message: string }>) => {
        state.isOpen = true
        state.message = action.payload?.message
    },
    [closeModal]: (state) => {
        state.isOpen = false
        state.message = ''
    }
}
)