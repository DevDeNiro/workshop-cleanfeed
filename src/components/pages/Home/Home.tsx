import { FC, useEffect, useState } from "react";
import {
    HomeWrapper,
    NotLoggedInMessage,
} from "@components/pages/Home/Home.styled.tsx";
import SearchBar from "@molecules/Searchbar/Searchbar.tsx";
import Feed from "@organisms/Feed/Feed.tsx";
import ProfileProps from "@pages/Profile/IProfile.ts";
import { Post } from "@organisms/Feed/IFeed.ts";
import { mockFetchPosts } from "@api/fetchPosts.ts";
import { FormattedMessage } from "react-intl";
import Tag from "@atoms/Tag/Tag.tsx";

type HomeProps = ProfileProps;

const Home: FC<HomeProps> = ({ user }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const maxTags = 5;
    const [loading, setLoading] = useState<boolean>(true);

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
            console.log("Envoyer les tags à l'API:", tags);
            // Appel API ici...
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
                <p>Chargement des posts...</p>
            ) : (
                <>
                    <SearchBar onSearch={handleSearch} />
                    <div style={{ marginTop: "1em" }}>
                        {tags.length > 0 && (
                            <div>
                                {tags.map((tag, index) => (
                                    <Tag
                                        key={index}
                                        label={tag}
                                        onRemove={() => handleTagRemove(index)}
                                    />
                                ))}
                            </div>
                        )}
                        {tags.length === maxTags && (
                            <p style={{ color: "red" }}>
                                Maximum de {maxTags} tags atteint.
                            </p>
                        )}
                    </div>

                    <button onClick={handleSubmit} disabled={tags.length === 0}>
                        Rechercher
                    </button>
                    <Feed posts={posts} />
                </>
            )}
        </HomeWrapper>
    );
};

export default Home;
