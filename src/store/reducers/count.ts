import { createAction, createReducer } from '@reduxjs/toolkit'
import { RootState } from 'store/rootReducer'

type countState = {
  value: number
  time?: number
}

const initialState: countState = {
  value: 0,
}
export const increment: any = createAction("count/increment")
export const decrement: any = createAction("count/decrement")
export const incrementByTime: any = createAction("count/incrementByTime")
export const selectCount = (state: RootState) => state.count

export default createReducer(initialState, {
  [increment]: (state: countState): any => {
    state.value += 1
  },
  [decrement]: (state: countState): any => {
    state.value -= 1
  },
  [incrementByTime]: (state, action) => {
    state.value += action.payload
    state.time = new Date().getTime()
  }
})
