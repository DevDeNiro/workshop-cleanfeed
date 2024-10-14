import { User } from "firebase/auth";
import { FC } from "react";
import { HomeWrapper } from "@components/pages/Home/Home.styled.tsx";
import { FormattedMessage } from "react-intl";

interface HomeProps {
    user?: User | null;
}

const Home: FC<HomeProps> = ({ user }) => {
    return (
        <HomeWrapper>
            <h1>
                <FormattedMessage
                    id={"app.header.title"}
                    defaultMessage={"Hello world wep app !"}
                />
            </h1>
            <h2>
                <FormattedMessage
                    id={"app.header.status"}
                    values={{
                        userStatus: user
                            ? "app.header.status.loggedIn"
                            : "app.header.status.loggedOut",
                    }}
                />
            </h2>
            {user && <h3>{user.email}</h3>}
        </HomeWrapper>
    );
};

export default Home;
