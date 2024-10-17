import PostBlock from "@molecules/PostBlock/Postblock.tsx";
import { FC } from "react";
import {
    ComparisonWrapper,
    FeedWrapper,
    FilteredResultWrapper,
    TweetSection,
} from "@organisms/Feed/Feed.styled.tsx";
import { Post } from "@organisms/Feed/IFeed.ts";
import { mockFilteredResults } from "@utils/data/mocks.ts";

type FeedProps = {
    posts: Post[];
};

const Feed: FC<FeedProps> = ({ posts }) => {
    const filteredResults = mockFilteredResults;

    return (
        <ComparisonWrapper>
            <TweetSection>
                <h2>Tweets Récupérés</h2>
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

            <FilteredResultWrapper>
                <h2>Résultats Filtrés</h2>
                <div>
                    {filteredResults.length > 0 ? (
                        filteredResults.map((result, index) => (
                            <div key={index}>
                                <strong>Filtré :</strong>
                                <p
                                    dangerouslySetInnerHTML={{ __html: result }}
                                ></p>
                            </div>
                        ))
                    ) : (
                        <p>Aucun résultat filtré pour l'instant.</p>
                    )}
                </div>
            </FilteredResultWrapper>
        </ComparisonWrapper>
    );
};

export default Feed;
