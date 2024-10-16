import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "@utils/auth/firebaseConfig";
// Is done via cloud functions lambda
const functions = getFunctions(app);

export const callTwitterApi = async <T>(
    endpoint: string,
    method: "GET" | "POST",
    params: unknown,
    accessToken: string,
    accessTokenSecret: string,
): Promise<T> => {
    const twitterProxy = httpsCallable<unknown, T>(functions, "twitterProxy");

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
        console.error("Erreur lors de l'appel à la fonction Cloud:", error);
        throw error;
    }
};
