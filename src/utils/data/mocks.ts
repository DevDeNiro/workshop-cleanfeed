import ProfileProps from "@pages/Profile/IProfile.ts";
import { Post, Reply, Tweet } from "@organisms/Feed/IFeed.ts";

const mockUser: ProfileProps = {
    user: {
        uid: "123456789",
        displayName: "John Doe",
        email: "test.john@doe.com",
    },
};

const mockReplies: Reply[] = [
    {
        id: "987654321",
        displayName: "Jane Smith",
        username: "jane_smith",
        content: "Ceci est une réponse à un tweet.",
        likes: 12,
    },
    {
        id: "987654322",
        displayName: "Bob Martin",
        username: "bob_martin",
        content: "Je suis totalement d'accord !",
        likes: 5,
    },
];

const mockTweets: Tweet[] = [
    {
        id: "543210987",
        text: "Ceci est un faux tweet pour tester l'interface.",
        public_metrics: {
            like_count: 34,
        },
    },
    {
        id: "543210988",
        text: "Encore un autre faux tweet avec du contenu génial.",
        public_metrics: {
            like_count: 58,
        },
    },
];

const mockPosts: Post[] = mockTweets.map((tweet) => ({
    id: tweet.id,
    displayName: mockUser.user?.displayName || "Utilisateur inconnu",
    username: mockUser.user?.username || "inconnu",
    content: tweet.text,
    likes: tweet.public_metrics.like_count,
    replies: mockReplies,
}));

export { mockUser, mockReplies, mockTweets, mockPosts };
