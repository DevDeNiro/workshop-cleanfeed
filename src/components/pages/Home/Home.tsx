import { FC, useEffect, useState } from "react";
import {
    HomeWrapper,
    NotLoggedInMessage,
    SearchContainer,
    TagsContainer,
} from "@components/pages/Home/Home.styled.tsx";
import SearchBar from "@molecules/Searchbar/Searchbar.tsx";
import Feed from "@organisms/Feed/Feed.tsx";
import ProfileProps from "@pages/Profile/IProfile.ts";
import { Post } from "@organisms/Feed/IFeed.ts";
import { mockFetchPosts } from "@api/fetchPosts.ts";
import { FormattedMessage } from "react-intl";
import Tag from "@atoms/Tag/Tag.tsx";
import Button from "@atoms/Button/Button.tsx";
import { ButtonWrapper } from "@molecules/Searchbar/Searchbar.styled.tsx";
import { SyncLoader } from "react-spinners";

type HomeProps = ProfileProps;

const Home: FC<HomeProps> = ({ user }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingFilteredResults, setLoadingFilteredResults] =
        useState<boolean>(false);
    const [showFilteredResults, setShowFilteredResults] =
        useState<boolean>(false);
    const maxTags = 5;

    const handleSearch = (query: string) => {
        // Ajouter un tag seulement si on n'a pas encore atteint le maximum
        if (tags.length < maxTags && !tags.includes(query)) {
            setTags([...tags, query]);
        }
    };

    const handleTagRemove = (index: number) => {
        // Supprimer un tag par son index
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        // Envoyer les tags à l'API
        if (tags.length > 0) {
            setLoadingFilteredResults(true);
            console.log("Envoyer les tags à l'API:", tags);

            setTimeout(() => {
                setLoadingFilteredResults(false);
                setShowFilteredResults(true);
            }, 2000);
        }
    };

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }
        if (user) {
            mockFetchPosts(
                user?.username || "",
                user?.accessToken || "",
                user?.accessTokenSecret || "",
            )
                .then((data) => {
                    setPosts(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(
                        "Erreur lors du chargement des posts :",
                        error,
                    );
                    setLoading(false);
                });
        }
    }, [user]);

    return (
        <HomeWrapper>
            {!user ? (
                <NotLoggedInMessage>
                    <FormattedMessage
                        id={"app.header.not-connected"}
                        defaultMessage={"Status: {userStatus}"}
                    />
                </NotLoggedInMessage>
            ) : loading ? (
                <SyncLoader />
            ) : (
                <>
                    <SearchContainer>
                        <SearchBar onSearch={handleSearch} />
                        <ButtonWrapper>
                            <Button
                                handleClick={handleSubmit}
                                disabled={
                                    tags.length === 0 || tags.length === maxTags
                                }
                            >
                                <FormattedMessage
                                    id={"app.search.search-button"}
                                    defaultMessage={"Rechercher"}
                                />
                            </Button>
                        </ButtonWrapper>
                    </SearchContainer>

                    <TagsContainer>
                        {tags.map((tag, index) => (
                            <Tag
                                key={index}
                                label={tag}
                                onRemove={() => handleTagRemove(index)}
                            />
                        ))}
                    </TagsContainer>

                    {tags.length === maxTags && (
                        <p
                            style={{
                                color: "red",
                                width: 662,
                                margin: "12px auto",
                            }}
                        >
                            Maximum de {maxTags} tags atteint.
                        </p>
                    )}

                    <Feed
                        posts={posts}
                        showFilteredResults={showFilteredResults}
                        loadingFilteredResults={loadingFilteredResults}
                    />
                </>
            )}
        </HomeWrapper>
    );
};

export default Home;
