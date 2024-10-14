import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@utils/auth/firebaseConfig";
import {
    loginFailure,
    loginStart,
    loginSuccess,
    logout,
} from "@redux/firebase/authSlice.ts";
import { Dispatch } from "redux";

export const loginWithTwitter = () => async (dispatch: Dispatch) => {
    try {
        dispatch(loginStart());
        const result = await signInWithPopup(auth, provider);
        dispatch(loginSuccess(result.user));
    } catch (error: unknown) {
        if (error instanceof Error) {
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
