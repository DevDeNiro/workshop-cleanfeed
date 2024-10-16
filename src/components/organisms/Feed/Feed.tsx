import PostBlock from "@molecules/PostBlock/Postblock.tsx";
import { FC } from "react";
import { FeedWrapper } from "@organisms/Feed/Feed.styled.tsx";

export interface Post {
    id: string;
    displayName: string;
    username: string;
    content: string;
    likes: number;
    replies: Reply[];
}

export interface Reply {
    id: string;
    displayName: string;
    username: string;
    content: string;
    likes: number;
}

type FeedProps = {
    posts: Post[];
};

const Feed: FC<FeedProps> = ({ posts }) => {
    return (
        <FeedWrapper>
            <FeedWrapper>
                {posts.map((post) => (
                    <PostBlock
                        key={post.id}
                        displayName={post.displayName}
                        username={post.username}
                        content={post.content}
                        likes={post.likes}
                        replies={post.replies}
                    />
                ))}
            </FeedWrapper>
        </FeedWrapper>
    );
};

export default Feed;
