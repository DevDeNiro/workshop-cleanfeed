import { FC } from "react";
import { Navigate } from "react-router-dom";
import { LoginWrapper } from "@pages/Login/Login.styled.tsx";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store.ts";

const Login: FC = () => {
    const { user, isLoggedIn } = useSelector(
        (state: RootState) => state.firebase,
    );

    if (user && !isLoggedIn) {
        return <LoginWrapper>Logging in...</LoginWrapper>;
    }

    return <Navigate to={"/"} />;
};

export default Login;
