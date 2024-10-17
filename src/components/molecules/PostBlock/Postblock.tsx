import { FC } from "react";
import {
    PostblockWrapper,
    ReplyWrapper,
} from "@molecules/PostBlock/Postblock.styled.tsx";
import { Reply } from "@organisms/Feed/IFeed.ts";
import Checkbox from "@atoms/Checkbox/Checkbox.tsx";
import Button from "@atoms/Button/Button.tsx";

type PostBlockProps = {
    displayName: string;
    username: string;
    content: string;
    likes: number;
    replies: Reply[];
    selectedComments: string[];
    onCommentSelect: (commentId: string, checked: boolean) => void;
    onSelectAll: () => void;
};

const PostBlock: FC<PostBlockProps> = ({
    username,
    displayName,
    content,
    likes,
    replies,
    selectedComments,
    onCommentSelect,
    onSelectAll,
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
                    <h4>Réponses:</h4>
                    <Button handleClick={onSelectAll} logout={false}>
                        Sélectionner Tout
                    </Button>
                    {replies.map((reply) => (
                        <div key={reply.id} className="reply-block">
                            <Checkbox
                                label=""
                                onChange={(e) =>
                                    onCommentSelect(reply.id, e.target.checked)
                                }
                                checked={selectedComments.includes(reply.id)}
                            />
                            <strong>{reply.displayName}</strong>@
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
