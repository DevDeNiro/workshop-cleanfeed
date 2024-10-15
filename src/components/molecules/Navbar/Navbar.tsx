// Extern
import { ChangeEvent, FC } from "react";
import { User } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
    FormattedMessage,
    injectIntl,
    WrappedComponentProps,
} from "react-intl";
import logo from "@assets/logo.svg";

// Intern
import { RootState } from "@redux/store.ts";
import Select from "@components/atoms/Select/Select.tsx";
import NavItem from "@components/atoms/NavItem/NavItem.tsx";
import Button from "@components/atoms/Button/Button.tsx";
import BurgerButton from "@components/atoms/BurgerButton/BurgerButton.tsx";
import NavbarStyled from "@components/molecules/Navbar/Navbar.styled.tsx";
import { selectLanguage } from "@redux/intl/intlSlice.ts";
import { selectOptions } from "@utils/selectTranslationValues.ts";
import { toggleVerticalMenu } from "@redux/menu/menuSlice.ts";

export interface NavbarProps extends WrappedComponentProps {
    handleLogout: () => void;
    handleLogin: () => void;
    handleShowMenu: () => void;
    user?: User | null;
    isAuthenticated: boolean;
}

const Navbar: FC<NavbarProps> = ({
    handleLogout,
    handleLogin,
    intl,
    isAuthenticated,
}) => {
    const dispatch = useDispatch();
    const intlState = useSelector((state: RootState) => state.intl);
    const menuState = useSelector(
        (state: RootState) => state.menu.showVerticalMenu,
    );
    const handleShowMenu = () => {
        dispatch(toggleVerticalMenu(!menuState));
    };

    const { user } = useSelector((state: RootState) => state.firebase);

    const userStatusMessage = intl.formatMessage({
        id: user ? "app.header.status.loggedIn" : "app.header.status.loggedOut",
    });

    return (
        <NavbarStyled role={"navigation"}>
            {/*Left Container*/}
            <div className={"left-container"}>
                <div
                    role={"img"}
                    aria-label={"Logo"}
                    className={"logo-wrapper"}
                >
                    <img src={logo} alt={"Logo"} />
                </div>

                <span>
                    <FormattedMessage
                        id={"app.header.title"}
                        defaultMessage={"Hello world wep app !"}
                    />
                </span>
                <NavItem translationKey={"app.header.home"} linkTo={"/"} />
                {user && (
                    <NavItem
                        translationKey={"app.header.profile"}
                        linkTo={"/profile"}
                    />
                )}
            </div>

            {/*Right Container*/}
            <div className={"right-container"}>
                <span>
                    <FormattedMessage
                        id={"app.header.status"}
                        defaultMessage={"Status: {userStatus}"}
                        values={{ userStatus: userStatusMessage }}
                    />
                </span>
                {!user && !isAuthenticated && (
                    <Button
                        hasPopup={false}
                        expanded={false}
                        logout={false}
                        handleClick={handleLogin}
                    >
                        <FormattedMessage
                            id={"app.header.login"}
                            values={{ loginMode: "Twitter" }}
                        />
                    </Button>
                )}
                {user && (
                    <Button
                        hasPopup={false}
                        expanded={false}
                        logout={true}
                        handleClick={handleLogout}
                    >
                        <FormattedMessage id={"app.header.logout"} />
                    </Button>
                )}

                {
                    <Select
                        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                            dispatch(selectLanguage(event))
                        }
                        options={selectOptions}
                        value={intlState.locale}
                    />
                }

                <BurgerButton
                    handleShowMenu={handleShowMenu}
                    hasPopup={true}
                    expanded={menuState}
                />
            </div>
        </NavbarStyled>
    );
};
// react-refresh/only-export-components
const EnhancedNavbar = injectIntl(Navbar);
export default EnhancedNavbar;
