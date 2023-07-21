import {createSlice} from '@reduxjs/toolkit'

const initState = {
    newUser : null,
    token: null
}

export const authorizationSlice = createSlice({
    name: 'authorization',
    initialState: initState,
    reducers: {
        login: (state, action) => {
            localStorage.clear()
            state.newUser = action?.payload?.dataUser
            state.token = action?.payload?.token
        },
        register: (state, action) => {
            localStorage.clear()
            state.newUser = action?.payload?.newUser
            state.token = action?.payload?.token
        },
        logout: (state, action) => {
            state.newUser = null
            state.token = null
            localStorage.clear()
        },
        updateUser: (state, action) => {
            state.newUser = action.payload 
        },
        follow: (state, action) => {
            if (state?.newUser?.following?.includes(action?.payload)) {
                state.newUser.following = state?.newUser?.following?.filter((id) => id !== action?.payload)
            } else {
                console.log(action?.payload)
                state.newUser.following.push(action?.payload)
            }
        }
    }
})

export const {login, register, follow, logout, updateUser} = authorizationSlice.actions
export default authorizationSlice.reducer