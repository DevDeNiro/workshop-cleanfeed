// Fetch user tweets with: GET https://api.twitter.com/2/users/{id}/tweets
import { callTwitterApi } from "@api/callTwitterApi.ts";

export interface TwitterTweet {
    id: string;
    text: string;
    created_at: string;
    public_metrics: {
        like_count: number;
        retweet_count: number;
        reply_count: number;
        quote_count: number;
    };
}

export const fetchUserTweets = async (
    userId: string,
    accessToken: string,
    accessTokenSecret: string,
): Promise<TwitterTweet[]> => {
    try {
        const endpoint = `/users/${userId}/tweets`;
        const method = "GET";
        const params = {
            max_results: 5,
            "tweet.fields": "created_at,public_metrics",
        };

        const response = await callTwitterApi<{ data: TwitterTweet[] }>(
            endpoint,
            method,
            params,
            accessToken,
            accessTokenSecret,
        );

        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des tweets:", error);
        throw error;
    }
};
