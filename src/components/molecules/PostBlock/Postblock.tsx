import { FC } from "react";
import {
    PostblockWrapper,
    ReplyWrapper,
} from "@molecules/PostBlock/Postblock.styled.tsx";
import { Reply } from "@organisms/Feed/IFeed.ts";

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
            <div className="user-info">
                <strong>{displayName}</strong> @{username}
            </div>
            <div className="content">{content}</div>
            <div className="likes">Likes: {likes}</div>

            {replies && replies.length > 0 && (
                <ReplyWrapper>
                    <h4>Responses:</h4>
                    {replies.map((reply) => (
                        <div key={reply.id} className="reply-block">
                            <strong>{reply.displayName}</strong> @
                            {reply.username}
                            <div>{reply.content}</div>
                            <div>Likes: {reply.likes}</div>
                        </div>
                    ))}
                </ReplyWrapper>
            )}
        </PostblockWrapper>
    );
};

export default PostBlock;
