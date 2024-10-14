import { User } from "oidc-client-ts";
import { FC } from "react";
import { HomeWrapper } from "@components/pages/Home/Home.styled.tsx";
import Feed from "@organisms/Feed/Feed.tsx";
import SearchBar from "@molecules/Searchbar/Searchbar.tsx";
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

const Home: FC<HomeProps> = () => {
    // TODO: Implement the keycloak state
    // const keycloack = useSelector((state: any) => state.keycloak);

    /*
    const [posts, setPosts] = useState<Post[]>([]);

    const handleSearch = async (keyword: string) => {
        setPosts(fetchedPosts);
    };
     */

    const handleSearch = async (keyword: string) => {
        console.log(keyword);
    };

    return (
        <HomeWrapper>
            <h1>CleanFeed</h1>
            <SearchBar onSearch={handleSearch} />
            <Feed posts={fetchedPosts} />
        </HomeWrapper>
    );
};

export default Home;
