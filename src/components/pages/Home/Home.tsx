import { User } from "firebase/auth";
import { FC } from "react";
import { HomeWrapper } from "@components/pages/Home/Home.styled.tsx";
import { FormattedMessage, useIntl } from "react-intl";
import SearchBar from "@molecules/Searchbar/Searchbar.tsx";
import Feed from "@organisms/Feed/Feed.tsx";
import data from "@utils/data/twitter-data.ts";

interface HomeProps {
    user?: User | null;
}

export type Post = {
    id: string;
    username: string;
    handle: string;
    content: string;
    likes: number;
};

const fetchedPosts = data;

const Home: FC<HomeProps> = ({ user }) => {
    const intl = useIntl();

    const userStatusMessage = intl.formatMessage({
        id: user ? "app.header.status.loggedIn" : "app.header.status.loggedOut",
    });

    const handleSearch = (query: string) => {
        console.log(`Search query: ${query}`);
    };

    return (
        <HomeWrapper>
            <h2>
                <FormattedMessage
                    id={"app.header.status"}
                    defaultMessage={"Status: {userStatus}"}
                    values={{ userStatus: userStatusMessage }}
                />
            </h2>
            {user && <h3>{user.email}</h3>}

            <SearchBar onSearch={handleSearch} />
            <Feed posts={fetchedPosts} />
        </HomeWrapper>
    );
};

export default Home;
