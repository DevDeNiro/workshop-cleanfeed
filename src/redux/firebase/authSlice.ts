import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { User } from "firebase/auth"; // Remplacé par SerializedUser
import { loginWithTwitter, logoutUser } from "@redux/firebase/authActions.ts";

export type SerializedUser = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL?: string | null;
  accessToken?: string | null;
  accessTokenSecret?: string | null;
  username?: string | null;
};

type AuthState = {
  user: SerializedUser | null;
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
    setUser(state, action: PayloadAction<SerializedUser | null>) {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.isLoggedIn = false;
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
        (state, action: PayloadAction<SerializedUser | undefined>) => {
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

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
