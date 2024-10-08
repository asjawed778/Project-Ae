import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem('token') || null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, actions) => {
            state.token = actions.payload.token;
            localStorage.setItem('token', actions.payload.token);
        },
        logout: (state, actions) => {
            state.token = null;
            localStorage.removeItem('token');
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
