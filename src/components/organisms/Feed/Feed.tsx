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
import { useBreakpoint } from "@/hooks";
import { FaFlag, FaTrash } from "react-icons/fa6";

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
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  const buttonPadding = isMobile
    ? "6px 12px"
    : isTablet
      ? "8px 16px"
      : "10px 20px";
  const fontSize = isMobile ? "11px" : isTablet ? "13px" : "15px";

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
            ...allCommentIds.filter((id) => !prevSelected.includes(id)),
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
      <TweetSection
        style={{
          flex: showFilteredResults && isDesktop ? "0.6" : "1",
          fontSize,
        }}
      >
        <StyledTweetSectionHeader>
          <h2 style={{ fontSize }}>
            <FormattedMessage
              id={"app.feed.retrieve-tweets"}
              defaultMessage={"Tweets Récupérés"}
            />
          </h2>

          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              handleClick={handleBulkDelete}
              logout={true}
              style={{ padding: buttonPadding }}
            >
              <FaTrash style={{ marginRight: "8px" }} />
              <FormattedMessage
                id={"app.feed.bulk-delete-all"}
                defaultMessage={"Supprimer tous les commentaires sélectionnés"}
              />
            </Button>
            <Button
              handleClick={handleBulkReport}
              logout={true}
              style={{ padding: buttonPadding }}
            >
              <FaFlag style={{ marginRight: "8px" }} />
              <FormattedMessage
                id={"app.feed.bulk-report-all"}
                defaultMessage={"Signaler tous les commentaires sélectionnés"}
              />
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
        <FilteredResultWrapper
          style={{
            flex: isDesktop ? "0.4" : "1",
          }}
        >
          <h2 style={{ margin: "0 0 13px 3px" }}>
            <FormattedMessage
              id={"app.feed.filtered-tweets"}
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
