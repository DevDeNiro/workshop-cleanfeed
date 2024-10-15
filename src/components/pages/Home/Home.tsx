import { User } from "firebase/auth";
import { FC } from "react";
import { HomeWrapper } from "@components/pages/Home/Home.styled.tsx";
import { FormattedMessage, useIntl } from "react-intl";

interface HomeProps {
    user?: User | null;
}

const Home: FC<HomeProps> = ({ user }) => {
    const intl = useIntl();

    const userStatusMessage = intl.formatMessage({
        id: user ? "app.header.status.loggedIn" : "app.header.status.loggedOut",
    });

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
                    defaultMessage={"Status: {userStatus}"}
                    values={{ userStatus: userStatusMessage }}
                />
            </h2>
            {user && <h3>{user.email}</h3>}
        </HomeWrapper>
    );
};

export default Home;
