import { auth, provider } from "@utils/auth/firebaseConfig";
import { loginFailure, loginStart, logout } from "@redux/firebase/authSlice.ts";
import { Dispatch } from "redux";
import { signInWithPopup } from "firebase/auth";

export const loginWithTwitter = () => async (dispatch: Dispatch) => {
    try {
        dispatch(loginStart());
        await signInWithPopup(auth, provider);
        console.log("Redirecting to Twitter for authentication...");
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Login failed with error:", error);
            dispatch(loginFailure(error.message));
        } else {
            dispatch(loginFailure("An unknown error occurred"));
        }
    }
};

export const logoutUser = () => async (dispatch: Dispatch) => {
    try {
        await auth.signOut();
        dispatch(logout());
    } catch (error: unknown) {
        console.error(error);
    }
};
