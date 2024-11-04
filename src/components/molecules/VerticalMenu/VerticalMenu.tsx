// External imports
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps,
} from "react-intl";
import { ChangeEvent, FC, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// Local imports
import { RootState } from "@redux/store.ts";
import Select from "@components/atoms/Select/Select.tsx";
import VerticalMenuStyled from "@components/molecules/VerticalMenu/VerticalMenu.styled.tsx";
import NavItem from "@components/atoms/NavItem/NavItem.tsx";
import Button from "@components/atoms/Button/Button.tsx";
import { selectLanguage } from "@redux/intl/intlSlice.ts";
import { selectOptions } from "@utils/selectTranslationValues.ts";
import { SerializedUser } from "@redux/firebase/authSlice.ts";

export interface VerticalMenuProps extends WrappedComponentProps {
  handleLogin: () => void;
  handleLogout: () => void;
  isAuthenticated: boolean;
  user?: SerializedUser | null;
  className?: string;
  handleShowMenu?: () => void;
  onMenuItemClick?: () => void;
}

const VerticalMenu: FC<VerticalMenuProps> = ({
  handleLogin,
  handleLogout,
  isAuthenticated,
  intl,
  user,
  className,
  onMenuItemClick,
}) => {
  const verticalMenuRef = useRef<HTMLDivElement>(null);

  const intlState = useSelector((state: RootState) => state.intl);
  const menuState = useSelector(
    (state: RootState) => state.menu.showVerticalMenu,
  );

  const dispatch = useDispatch();

  return (
    <VerticalMenuStyled className={className ?? ""} ref={verticalMenuRef}>
      <div className="vertical-menu-content">
        <FormattedMessage
          id={"app.header.title"}
          values={{
            userStatus: intl.formatMessage({
              id: user
                ? "app.header.status.loggedIn"
                : "app.header.status.loggedOut",
              defaultMessage: user ? "Logged in as {name}" : "Logged out",
            }),
          }}
        />

        <NavItem
          translationKey={"app.header.home"}
          linkTo={"/"}
          onNavItemClick={onMenuItemClick}
        />
        {user && (
          <NavItem
            translationKey={"app.header.profile"}
            linkTo={"/profile"}
            onNavItemClick={onMenuItemClick}
          />
        )}
        {/* Add button to Log in and Log out*/}
        {!user && !isAuthenticated && (
          <Button
            hasPopup={true}
            expanded={menuState}
            logout={false}
            handleClick={() => {
              handleLogin();
              if (onMenuItemClick) {
                onMenuItemClick();
              }
            }}
          >
            <FormattedMessage
              id={"app.header.login"}
              values={{ loginMode: "Twitter" }}
            />
          </Button>
        )}
        {/* Add Button to Log out if auth */}
        {user && (
          <Button
            hasPopup={false}
            expanded={menuState}
            logout={true}
            handleClick={() => {
              handleLogout();
              if (onMenuItemClick) {
                onMenuItemClick();
              }
            }}
          >
            <FormattedMessage id={"app.header.logout"} />
          </Button>
        )}

        <Select
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            dispatch(selectLanguage(event))
          }
          options={selectOptions}
          value={intlState.locale}
        ></Select>
      </div>
    </VerticalMenuStyled>
  );
};
// react-refresh/only-export-components
const EnhancedVerticalMenu = injectIntl(VerticalMenu);
export default EnhancedVerticalMenu;
