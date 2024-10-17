import { FC } from "react";
import {
    PostblockWrapper,
    ReplyWrapper,
    StyledPostBlocSectionHeader,
} from "@molecules/PostBlock/Postblock.styled.tsx";
import { Reply } from "@organisms/Feed/IFeed.ts";
import Checkbox from "@atoms/Checkbox/Checkbox.tsx";
import Button from "@atoms/Button/Button.tsx";
import { useBreakpoint } from "@/hooks";

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
    replies,
    selectedComments,
    onCommentSelect,
    onSelectAll,
}) => {
    const { isMobile, isTablet } = useBreakpoint();

    const buttonPadding = isMobile
        ? "6px 12px"
        : isTablet
          ? "8px 16px"
          : "10px 20px";
    const textPadding = isMobile ? "8px" : isTablet ? "12px" : "16px";
    const likesFontSize = isMobile ? "10px" : isTablet ? "11px" : "13px";

    return (
        <PostblockWrapper>
            <div className="user-info" style={{ padding: textPadding }}>
                <strong>{displayName}</strong>
                <div className="username">@{username}</div>
            </div>
            <div className="content" style={{ padding: textPadding }}>
                {content}
            </div>

            {replies && replies.length > 0 && (
                <ReplyWrapper style={{ padding: textPadding }}>
                    <StyledPostBlocSectionHeader>
                        <h3>Réponses:</h3>
                        <Button
                            handleClick={onSelectAll}
                            logout={false}
                            style={{ padding: buttonPadding }}
                        >
                            Sélectionner Tout
                        </Button>
                    </StyledPostBlocSectionHeader>
                    {replies.map((reply) => (
                        <div key={reply.id} className="reply-block">
                            <Checkbox
                                label=""
                                onChange={(e) =>
                                    onCommentSelect(reply.id, e.target.checked)
                                }
                                checked={selectedComments.includes(reply.id)}
                            />
                            <div
                                className="reply-info"
                                style={{
                                    marginRight: "15px",
                                    maxWidth: "125px",
                                    width: "100%",
                                }}
                            >
                                <strong>{reply.displayName}</strong>
                                <div className="username">
                                    @{reply.username}
                                </div>
                            </div>
                            <div style={{ maxWidth: "985px", width: "100%" }}>
                                {reply.content}
                            </div>
                            <div
                                className="likes"
                                style={{ fontSize: likesFontSize }}
                            >
                                Likes: {reply.likes}
                            </div>
                        </div>
                    ))}
                </ReplyWrapper>
            )}
        </PostblockWrapper>
    );
};

export default PostBlock;
