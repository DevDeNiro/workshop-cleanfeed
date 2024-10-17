import PostBlock from "@molecules/PostBlock/Postblock.tsx";
import { FC } from "react";
import {
    ComparisonWrapper,
    FeedWrapper,
    FilteredResult,
    FilteredResultWrapper,
    TweetSection,
} from "@organisms/Feed/Feed.styled.tsx";
import { Post } from "@organisms/Feed/IFeed.ts";
import { mockFilteredResults } from "@utils/data/mocks.ts";
import { SyncLoader } from "react-spinners";

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

    return (
        <ComparisonWrapper>
            <TweetSection>
                <h2 style={{ margin: "0 0 13px 3px" }}>Tweets Récupérés</h2>
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
            </TweetSection>

            {showFilteredResults && (
                <FilteredResultWrapper>
                    <h2 style={{ margin: "0 0 13px 3px" }}>
                        Résultats Filtrés
                    </h2>
                    {loadingFilteredResults ? (
                        <SyncLoader />
                    ) : (
                        <FilteredResult>
                            {filteredResults.length > 0 ? (
                                filteredResults.map((result, index) => (
                                    <div key={index}>
                                        <strong>Filtré :</strong>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: result,
                                            }}
                                        ></p>
                                    </div>
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
