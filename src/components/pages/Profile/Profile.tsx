import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ProfileWrapper } from "@pages/Profile/Profile.styled.tsx";
import ProfileProps from "@pages/Profile/IProfile.ts";

const Profile: FC<ProfileProps> = ({ user }) => {
    const location = useLocation();

    if (!user) {
        return <Navigate to={"/"} state={{ from: location }} replace />;
    }

    return (
        user && (
            <ProfileWrapper>
                <h1>{user.displayName}</h1>
                <p>Username: {user.displayName}</p>
                <p>Email: {user.email}</p>
            </ProfileWrapper>
        )
    );
};

export default Profile;
