import { Post, Reply } from "@organisms/Feed/Feed.tsx";
import { fetchUserByUsername } from "@api/fetchUserByUsername.ts";
import { fetchUserTweets } from "@api/fetchUserTweets.ts";
import { fetchTweetReplies } from "@api/fetchTweetReplies.ts";

export const fetchPosts = async (
    username: string,
    accessToken: string,
    accessTokenSecret: string,
): Promise<Post[]> => {
    try {
        // Récupérer l'utilisateur
        const user = await fetchUserByUsername(
            username,
            accessToken,
            accessTokenSecret,
        );
        console.log(user, "user");
        // Récupérer les tweets de l'utilisateur
        const tweets = await fetchUserTweets(
            user.id,
            accessToken,
            accessTokenSecret,
        );
        // Pour chaque tweet, récupérer les réponses et mapper les données
        const posts: Post[] = await Promise.all(
            tweets.map(async (tweet) => {
                // Récupérer les réponses au tweet
                const repliesData = await fetchTweetReplies(
                    tweet.id,
                    accessToken,
                    accessTokenSecret,
                );

                // Mapper les réponses
                const replies: Reply[] = (repliesData.data || []).map(
                    (reply) => {
                        const user = repliesData.includes.users.find(
                            (u) => u.id === reply.author_id,
                        );
                        return {
                            id: reply.id,
                            displayName: user
                                ? user.name
                                : "Utilisateur inconnu",
                            username: user ? user.username : "",
                            content: reply.text,
                            likes: reply.public_metrics.like_count,
                        };
                    },
                );

                // Retourner le post
                return {
                    id: tweet.id,
                    displayName: user.name,
                    username: user.username,
                    content: tweet.text,
                    likes: tweet.public_metrics.like_count,
                    replies,
                };
            }),
        );

        return posts;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Erreur lors de la récupération des posts:", error);
            throw error;
        } else {
            throw new Error(
                "Erreur inconnue lors de la récupération des posts",
            );
        }
    }
};
