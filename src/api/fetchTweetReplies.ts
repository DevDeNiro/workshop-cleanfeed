import { callTwitterApi } from "@api/callTwitterApi.ts";
import { TwitterUser } from "@api/fetchUserByUsername.ts";

// https://developer.x.com/en/docs/x-api/tweets/search/api-reference/get-tweets-search-recent#tab1
export interface TwitterReply {
  id: string;
  text: string;
  author_id: string;
  created_at: string;
  public_metrics: {
    like_count: number;
    retweet_count: number;
    reply_count: number;
    quote_count: number;
  };
}

export const fetchTweetReplies = async (
  tweetId: string,
  accessToken: string,
  accessTokenSecret: string,
): Promise<{
  data: TwitterReply[];
  includes: {
    users: TwitterUser[];
  };
}> => {
  try {
    const endpoint = `/tweets/search/recent`;
    const method = "GET";
    const params = {
      query: `in_reply_to_tweet_id:${tweetId}`,
      max_results: 5,
      "tweet.fields": "author_id,created_at,public_metrics",
      expansions: "author_id",
      "user.fields": "username,name",
    };

    const response = await callTwitterApi<{
      data: TwitterReply[];
      includes: {
        users: TwitterUser[];
      };
    }>(endpoint, method, params, accessToken, accessTokenSecret);

    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des réponses:", error);
    throw error;
  }
};
