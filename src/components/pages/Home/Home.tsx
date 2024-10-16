import { FC, useEffect, useState } from "react";
import { HomeWrapper } from "@components/pages/Home/Home.styled.tsx";
import { FormattedMessage, useIntl } from "react-intl";
import SearchBar from "@molecules/Searchbar/Searchbar.tsx";
import { fetchPosts } from "@api/fetchPosts.ts";
import Feed, { Post } from "@organisms/Feed/Feed.tsx";
import ProfileProps from "@pages/Profile/IProfile.ts";
import { RootState } from "@redux/store.ts";
import { useSelector } from "react-redux";

type HomeProps = ProfileProps;

const Home: FC<HomeProps> = ({ user }) => {
    const intl = useIntl();
    const [posts, setPosts] = useState<Post[]>([]);

    const userStatusMessage = intl.formatMessage({
        id: user ? "app.header.status.loggedIn" : "app.header.status.loggedOut",
    });

    const handleSearch = (query: string) => {
        console.log(`Search query: ${query}`);
    };

    const username = useSelector(
        (state: RootState) => state.firebase.user?.username,
    );
    const accessToken = useSelector(
        (state: RootState) => state.firebase.user?.accessToken,
    );
    const accessTokenSecret = useSelector(
        (state: RootState) => state.firebase.user?.accessTokenSecret,
    );
    console.log("user object", user);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                if (username && accessToken && accessTokenSecret) {
                    const fetchedPosts = await fetchPosts(
                        username,
                        accessToken,
                        accessTokenSecret,
                    );
                    setPosts(fetchedPosts);
                } else {
                    console.error(
                        "Les tokens d'accès ou le nom d'utilisateur sont manquants",
                    );
                }
            } catch (e) {
                console.error("Erreur lors de la récupération des posts:", e);
            }
        };
        loadPosts().then((r) => console.log(r));
    }, [username, accessToken, accessTokenSecret]);

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
            {user && <Feed posts={posts} />}
        </HomeWrapper>
    );
};

export default Home;
