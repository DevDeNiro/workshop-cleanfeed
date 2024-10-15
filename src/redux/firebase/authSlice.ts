import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { loginWithTwitter, logoutUser } from "@redux/firebase/authActions.ts";

type AuthState = {
    user: User | null;
    isLoggedIn: boolean;
    loading: boolean;
    error: null | string;
};

const initialState: AuthState = {
    user: null,
    isLoggedIn: false,
    loading: false,
    error: null,
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
                state.loading = true;
                state.error = null;
            })
            .addCase(
                loginWithTwitter.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.loading = false;
                    state.user = action.payload;
                },
            )
            .addCase(loginWithTwitter.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
