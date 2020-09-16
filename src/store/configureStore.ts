import { configureStore, getDefaultMiddleware, Store } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'

const middleware = [...getDefaultMiddleware()]

const store = (preloadedState?: any):Store =>
  configureStore({
    reducer: rootReducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
  })

export default store
