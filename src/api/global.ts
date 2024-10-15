// import axiosClient from "@api/axiosClient.ts";

/*
export async function getUserTweets(userId: string) {
    try {
        const response = await axiosClient.get(`/users/${userId}/tweets`, {
            params: {
                max_results: 5,
                "tweet.fields": "created_at,public_metrics",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des tweets:", error);
        throw error;
    }
}

export async function getTweetReplies(tweetId: string) {
    try {
        const response = await axiosClient.get(`/tweets/search/recent`, {
            params: {
                query: `in_reply_to_tweet_id:${tweetId}`,
                max_results: 5,
                "tweet.fields": "author_id,created_at,public_metrics",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des réponses:", error);
        throw error;
    }
}


 */
