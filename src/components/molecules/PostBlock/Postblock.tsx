import { FC } from "react";
import { PostblockWrapper } from "@molecules/PostBlock/Postblock.styled.tsx";
import { Reply } from "@organisms/Feed/Feed.tsx";

type PostBlockProps = {
    displayName: string;
    username: string;
    content: string;
    likes: number;
    replies: Reply[];
};

const PostBlock: FC<PostBlockProps> = ({
    username,
    displayName,
    content,
    likes,
    replies,
}) => {
    return (
        <PostblockWrapper>
            <div>
                <strong>{displayName}</strong> @{username}
            </div>
            <div>{content}</div>
            <div>Likes: {likes}</div>
            {replies && replies.length > 0 && (
                <div>
                    <h4>Réponses:</h4>
                    {replies.map((reply) => (
                        <div key={reply.id}>
                            <strong>{reply.displayName}</strong> @
                            {reply.username}
                            <div>{reply.content}</div>
                            <div>Likes: {reply.likes}</div>
                        </div>
                    ))}
                </div>
            )}
        </PostblockWrapper>
    );
};

export default PostBlock;
