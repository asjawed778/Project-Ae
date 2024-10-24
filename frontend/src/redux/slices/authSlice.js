import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem('token') || null,
    user: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, actions) => {
            state.token = actions.payload.token;
            state.user = actions.payload.user ;
            localStorage.setItem('token', actions.payload.token);
        },
        logout: (state, actions) => {
            state.token = null;
            state.user = null ;
            localStorage.removeItem('token');
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
