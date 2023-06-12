import { createSlice } from '@reduxjs/toolkit'

interface UserType {
    firstName: string
    lastName: string
    email: string
    profilePicture: string
}
export interface UserInterface {
    user: UserType | null
}

const storedUserInfo = localStorage.getItem('user')

const initialState: UserInterface = {
    user: storedUserInfo ? JSON.parse(storedUserInfo) : null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        logout: (state, _action) => {
            state.user = null
            localStorage.removeItem('user')
        }
    }
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer
