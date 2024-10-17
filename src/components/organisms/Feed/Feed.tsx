import PostBlock from "@molecules/PostBlock/Postblock.tsx";
import { FC, useState } from "react";
import {
    ComparisonWrapper,
    FeedWrapper,
    FilteredResultWrapper,
    StyledTweetSectionHeader,
    TweetSection,
} from "@organisms/Feed/Feed.styled.tsx";
import { Post } from "@organisms/Feed/IFeed.ts";
import { mockFilteredResults } from "@utils/data/mocks.ts";
import { SyncLoader } from "react-spinners";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import FilteredResult, {
    FilteredResultItem,
} from "@organisms/Feed/FilteredResult.tsx";
import Button from "@atoms/Button/Button.tsx";

type FeedProps = {
    posts: Post[];
    showFilteredResults: boolean;
    loadingFilteredResults: boolean;
};

const Feed: FC<FeedProps> = ({
    posts,
    showFilteredResults,
    loadingFilteredResults,
}) => {
    const filteredResults = mockFilteredResults;
    const [selectedComments, setSelectedComments] = useState<string[]>([]);

    // Sélectionner ou désélectionner un commentaire
    const handleSelectComment = (commentId: string, checked: boolean) => {
        setSelectedComments((prevSelected) => {
            if (checked) {
                return [...prevSelected, commentId];
            }
            return prevSelected.filter((id) => id !== commentId);
        });
    };

    // Sélectionner tous les commentaires d'un post
    const handleSelectAllComments = (postId: string) => {
        const allCommentIds =
            posts
                .find((post) => post.id === postId)
                ?.replies.map((reply) => reply.id) || [];
        setSelectedComments((prevSelected) => {
            const allSelected = allCommentIds.every((id) =>
                prevSelected.includes(id),
            );
            return allSelected
                ? prevSelected.filter((id) => !allCommentIds.includes(id))
                : [
                      ...prevSelected,
                      ...allCommentIds.filter(
                          (id) => !prevSelected.includes(id),
                      ),
                  ];
        });
    };

    const handleBulkDelete = () => {
        toast.success("Commentaires supprimés avec succès");
        console.log(
            "Suppression des commentaires sélectionnés...",
            selectedComments,
        );
    };

    const handleBulkReport = () => {
        toast.warn("Commentaires signalés avec succès");
        console.log(
            "Signalement des commentaires sélectionnés...",
            selectedComments,
        );
    };

    return (
        <ComparisonWrapper>
            <TweetSection>
                <StyledTweetSectionHeader>
                    <h2>
                        <FormattedMessage
                            id={"app.feed.retrieve-tweets"}
                            defaultMessage={"Tweets Récupérés"}
                        />
                    </h2>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <Button handleClick={handleBulkDelete} logout={true}>
                            Supprimer Sélectionnés
                        </Button>
                        <Button handleClick={handleBulkReport} logout={true}>
                            Signaler Sélectionnés
                        </Button>
                    </div>
                </StyledTweetSectionHeader>

                <FeedWrapper>
                    {posts.map((post) => (
                        <PostBlock
                            key={post.id}
                            displayName={post.displayName}
                            username={post.username}
                            content={post.content}
                            likes={post.likes}
                            replies={post.replies}
                            selectedComments={selectedComments}
                            onCommentSelect={handleSelectComment}
                            onSelectAll={() => handleSelectAllComments(post.id)}
                        />
                    ))}
                </FeedWrapper>
            </TweetSection>

            {showFilteredResults && (
                <FilteredResultWrapper>
                    <h2 style={{ margin: "0 0 13px 3px" }}>
                        <FormattedMessage
                            id={"app.search.filtered-tweets"}
                            defaultMessage={"Résultats Filtrés"}
                        />
                    </h2>
                    {loadingFilteredResults ? (
                        <SyncLoader />
                    ) : (
                        <FilteredResult>
                            {filteredResults.length > 0 ? (
                                filteredResults.map((result, index) => (
                                    <FilteredResultItem key={index}>
                                        <strong>Filtré :</strong>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: result,
                                            }}
                                        ></p>
                                    </FilteredResultItem>
                                ))
                            ) : (
                                <p>Aucun résultat filtré pour l'instant.</p>
                            )}
                        </FilteredResult>
                    )}
                </FilteredResultWrapper>
            )}
        </ComparisonWrapper>
    );
};

export default Feed;
