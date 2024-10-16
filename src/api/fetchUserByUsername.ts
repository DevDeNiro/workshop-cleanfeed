// https://developer.x.com/en/docs/x-api/users/lookup/api-reference/get-users-by-username-username
import { callTwitterApi } from "@api/callTwitterApi.ts";

export interface TwitterUser {
    id: string;
    name: string;
    username: string;
}

export const fetchUserByUsername = async (
    username: string,
    accessToken: string,
    accessTokenSecret: string,
): Promise<TwitterUser> => {
    try {
        const endpoint = `/users/by/username/${username}`;
        const method = "GET";
        const params = {};

        const response = await callTwitterApi<{ data: TwitterUser }>(
            endpoint,
            method,
            params,
            accessToken,
            accessTokenSecret,
        );

        return response.data;
    } catch (error) {
        console.error(
            "Erreur lors de la récupération de l'utilisateur:",
            error,
        );
        throw error;
    }
};
