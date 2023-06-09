import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import AuthSlice from './slices/userSlice'
import { apiSlice } from './api'

export const store = configureStore({
    reducer: {
        user: AuthSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
