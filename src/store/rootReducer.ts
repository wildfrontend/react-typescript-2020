import { combineReducers } from '@reduxjs/toolkit'
import count from './reducers/count'
import auth from './reducers/auth'
import request from './reducers/request'
import modal from './reducers/modal'

const rootReducer = combineReducers({
  count,
  auth,
  request,
  modal,
})
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
