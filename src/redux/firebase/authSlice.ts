import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { loginWithTwitter, logoutUser } from "@redux/firebase/authActions.ts";

type AuthState = {
    user: User | null;
    isLoggedIn: boolean;
    loginLoading: boolean;
    logoutLoading: boolean;
    loginError: null | string;
    logoutError: null | string;
};

const initialState: AuthState = {
    user: null,
    isLoggedIn: false,
    loginLoading: false,
    logoutLoading: false,
    loginError: null,
    logoutError: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Met à jour l'état de l'utilisateur lorsque l'état d'authentification change
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
            state.isLoggedIn = !!action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginWithTwitter.pending, (state) => {
                state.loginLoading = true;
                state.loginError = null;
            })
            .addCase(
                loginWithTwitter.fulfilled,
                (state, action: PayloadAction<User | undefined>) => {
                    if (action.payload) {
                        state.user = action.payload;
                        state.isLoggedIn = true;
                        state.loginError = null; // Reset de l'erreur
                    } else {
                        state.user = null;
                        state.isLoggedIn = false;
                        state.loginError = "Failed to log in.";
                    }
                },
            )
            .addCase(loginWithTwitter.rejected, (state, action) => {
                state.loginLoading = false;
                state.loginError = action.payload as string;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loginLoading = true;
                state.logoutError = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.logoutLoading = false;
                state.user = null;
                state.isLoggedIn = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.logoutLoading = false;
                state.logoutError = action.payload as string;
            });
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
