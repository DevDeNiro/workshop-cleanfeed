import { FC } from "react";
import { PostblockWrapper } from "@molecules/PostBlock/Postblock.styled.tsx";

type PostBlockProps = {
    username: string;
    handle: string;
    content: string;
    likes: number;
};

const PostBlock: FC<PostBlockProps> = ({
    username,
    handle,
    content,
    likes,
}) => {
    return (
        <PostblockWrapper>
            <div>
                <strong>{username}</strong> @{handle}
            </div>
            <div>{content}</div>
            <div>Likes: {likes}</div>
        </PostblockWrapper>
    );
};

export default PostBlock;
