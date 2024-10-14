import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/store.ts";
import { toggleVerticalMenu } from "@redux/menu/menuSlice";
import Navbar from "@molecules/Navbar/Navbar.tsx";
import VerticalMenu from "@molecules/VerticalMenu/VerticalMenu.tsx";
// import {useAuth} from "react-oidc-context";
import styled from "styled-components";
import VerticalMenuStyled from "@molecules/VerticalMenu/VerticalMenu.styled.tsx";
import { loginWithTwitter, logoutUser } from "@redux/firebase/authActions.ts";

const StyledPage = styled.div`
    width: 100%;

    ${VerticalMenuStyled} {
        position: absolute;
        top: 4rem;
        left: 0;

        &.hidden {
            width: 0vw;
        }
    }
`;

const MainLayout: FC = () => {
    const dispatch = useDispatch();
    const menuState = useSelector(
        (state: RootState) => state.menu.showVerticalMenu,
    );

    const { user, loading } = useSelector((state: RootState) => state.firebase);

    const handleLogin = () => {
        dispatch(loginWithTwitter());
    };

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    useEffect(() => {
        function handleWindowResize() {
            const windowWidth = window.innerWidth;
            if (windowWidth <= 1100) {
                dispatch(toggleVerticalMenu(false));
            }
        }

        window.addEventListener("resize", handleWindowResize);
        // Cleanup
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, [dispatch]);

    return (
        <StyledPage>
            <Navbar
                handleShowMenu={() =>
                    dispatch(toggleVerticalMenu(!menuState.showVerticalMenu))
                }
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                user={user}
                isAuthenticated={loading}
            />

            <VerticalMenu
                handleShowMenu={() => dispatch(toggleVerticalMenu(false))}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                user={user}
                className={menuState ? "visible" : "hidden"}
                isAuthenticated={loading}
            />

            <Outlet />
        </StyledPage>
    );
};

export default MainLayout;
