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

type HomeProps = ProfileProps;

const Home: FC<HomeProps> = ({ user }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const handleSearch = (query: string) => {
        console.log(`Search query: ${query}`);
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
                    Vous n'êtes pas connecté. Veuillez vous connecter pour
                    accéder à votre fil d'actualité.
                </NotLoggedInMessage>
            ) : loading ? (
                <p>Chargement des posts...</p>
            ) : (
                <>
                    <SearchBar onSearch={handleSearch} />
                    <Feed posts={posts} />
                </>
            )}
        </HomeWrapper>
    );
};

export default Home;
