import {
  getAdditionalUserInfo,
  signInWithPopup,
  signOut,
  TwitterAuthProvider,
} from "firebase/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, provider } from "@utils/auth/firebaseConfig.ts";
// import {getFunctions, httpsCallable} from "firebase/functions";
import { SerializedUser } from "@redux/firebase/authSlice.ts";

/*
// Initialisez Firebase Functions
const functions = getFunctions();


export const loginWithTwitter = async () => {
    try {
        const provider = new TwitterAuthProvider();
        const result = await signInWithPopup(auth, provider);

        // Récupérer les credentials OAuth 1.0a
        const credential = TwitterAuthProvider.credentialFromResult(result);

        if (credential) {
            const accessToken = credential.accessToken;
            const accessTokenSecret = credential.secret;

            // Récupérer les informations de l'utilisateur
            const additionalUserInfo = result.additionalUserInfo;
            const username = additionalUserInfo?.username;

            // Stocker ces informations pour les utiliser lors des appels API
            // Par exemple, dans le state ou le contexte
        }
    } catch (error) {
        console.error("Erreur lors de l'authentification Twitter :", error);
    }
};

export const callTwitterApi = async (
    endpoint: string,
    method: string,
    params: any,
    accessToken: string,
    accessTokenSecret: string
) => {
    const twitterProxy = httpsCallable(functions, 'twitterProxy');

    const data = {
        url: `https://api.twitter.com/2${endpoint}`,
        method,
        params,
        accessToken,
        accessTokenSecret,
    };

    try {
        const result = await twitterProxy(data);
        return result.data;
    } catch (error) {
        console.error('Erreur lors de l\'appel à l\'API Twitter via le proxy:', error);
        throw error;
    }
};

 */

export const loginWithTwitter = createAsyncThunk(
  "auth/loginWithTwitter",
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const credential = TwitterAuthProvider.credentialFromResult(result);
      if (!credential) {
        throw new Error("No credential found");
      }

      const accessToken = credential.accessToken;
      const accessTokenSecret = credential.secret;

      // Can use getAdditionalUserInfo to observe the user's profile,
      // to check if a user is new or not...
      const additionalUserInfo = getAdditionalUserInfo(result);
      const username = additionalUserInfo?.username;

      const serializedUser: SerializedUser = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        accessTokenSecret,
        accessToken,
        username,
      };

      return serializedUser;
    } catch (error: unknown) {
      if (error instanceof Error) {
        let errorMessage = "An unknown error occurred";
        if (error.name === "auth/network-request-failed") {
          errorMessage = "Network error. Please try again later.";
        }
        return rejectWithValue(errorMessage || "An unknown error occurred");
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
        return rejectWithValue(error.message || "An unknown error occurred");
      }
    }
  },
);
