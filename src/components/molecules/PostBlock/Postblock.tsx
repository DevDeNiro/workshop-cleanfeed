import { FC } from "react";
import { PostblockWrapper } from "@molecules/PostBlock/Postblock.styled.tsx";

// type Reply = {
//     id: string;
//     username: string;
//     handle: string;
//     content: string;
//     likes: number;
// };

type PostBlockProps = {
    username: string;
    handle: string;
    content: string;
    likes: number;
    // replies: Reply[];
};

const PostBlock: FC<PostBlockProps> = ({
    username,
    handle,
    content,
    likes,
    // replies,
}) => {
    return (
        <PostblockWrapper>
            <div>
                <strong>{username}</strong> @{handle}
            </div>
            <div>{content}</div>
            <div>Likes: {likes}</div>
            {/* Afficher les réponses
            {replies && replies.length > 0 && (
                <div>
                    <h4>Réponses:</h4>
                    {replies.map((reply) => (
                        <div key={reply.id}>
                            <strong>{reply.username}</strong> @{reply.handle}
                            <div>{reply.content}</div>
                            <div>Likes: {reply.likes}</div>
                        </div>
                    ))}
                </div>
            )}
            */}
        </PostblockWrapper>
    );
};

export default PostBlock;
