import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

type AuthState = {
    user: User | null;
    loading: boolean;
    error: null | string;
};

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart(state) {
            state.loading = true;
        },
        loginSuccess(state, action: PayloadAction<User>) {
            state.loading = false;
            state.user = action.payload;
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.user = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
    authSlice.actions;
export default authSlice.reducer;
