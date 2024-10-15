import PostBlock from "@molecules/PostBlock/Postblock.tsx";
import { FC } from "react";
import { FeedWrapper, CustomScroll } from "@organisms/Feed/Feed.styled.tsx";

type Post = {
    id: string;
    username: string;
    handle: string;
    content: string;
    likes: number;
};

type FeedProps = {
    posts: Post[];
};

const Feed: FC<FeedProps> = ({ posts }) => {
    return (
        <CustomScroll>
            <FeedWrapper>
                {posts.map((post) => (
                    <PostBlock
                        key={post.id}
                        username={post.username}
                        handle={post.handle}
                        content={post.content}
                        likes={post.likes}
                    />
                ))}
            </FeedWrapper>
        </CustomScroll>
    );
};

export default Feed;
