import { signInWithPopup, signOut } from "firebase/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, provider } from "@utils/auth/firebaseConfig.ts";

export const loginWithTwitter = createAsyncThunk(
    "auth/loginWithTwitter",
    async (_, { rejectWithValue }) => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            return user;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Login failed with error:", error);
                return rejectWithValue(
                    error.message || "An unknown error occurred",
                );
            }
        }
    },
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            await signOut(auth);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Logout failed with error:", error);
                return rejectWithValue(
                    error.message || "An unknown error occurred",
                );
            }
        }
    },
);
