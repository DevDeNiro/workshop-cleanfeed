import { FC, useEffect, useState } from "react";
import { HomeWrapper } from "@components/pages/Home/Home.styled.tsx";
import { FormattedMessage, useIntl } from "react-intl";
import SearchBar from "@molecules/Searchbar/Searchbar.tsx";
import Feed from "@organisms/Feed/Feed.tsx";
import ProfileProps from "@pages/Profile/IProfile.ts";
import { Post } from "@organisms/Feed/IFeed.ts";
import { mockFetchPosts } from "@api/fetchPosts.ts";

type HomeProps = ProfileProps;

const Home: FC<HomeProps> = ({ user }) => {
    const intl = useIntl();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const userStatusMessage = intl.formatMessage({
        id: user ? "app.header.status.loggedIn" : "app.header.status.loggedOut",
    });

    const handleSearch = (query: string) => {
        console.log(`Search query: ${query}`);
    };

    useEffect(() => {
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
            <h2>
                <FormattedMessage
                    id={"app.header.status"}
                    defaultMessage={"Status: {userStatus}"}
                    values={{ userStatus: userStatusMessage }}
                />
            </h2>
            <SearchBar onSearch={handleSearch} />
            {loading ? (
                <p>Chargement des posts...</p>
            ) : (
                user && <Feed posts={posts} />
            )}
        </HomeWrapper>
    );
};

export default Home;
