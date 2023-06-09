import { createSlice } from '@reduxjs/toolkit'

export interface UserInterface {
    user: {} | null
}

const storedUserInfo = localStorage.getItem('user')

const initialState: UserInterface = {
    user: storedUserInfo
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            ;(state.user = action.payload), localStorage.setItem('user', JSON.stringify(action.payload))
        },
        logout: (state, _action) => {
            state.user = ''
            localStorage.removeItem('user')
        }
    }
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer
