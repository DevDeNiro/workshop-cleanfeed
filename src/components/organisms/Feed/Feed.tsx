import PostBlock from "@molecules/PostBlock/Postblock.tsx";
import { FC } from "react";
import { FeedWrapper } from "@organisms/Feed/Feed.styled.tsx";
import { Post } from "@organisms/Feed/IFeed.ts";

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
