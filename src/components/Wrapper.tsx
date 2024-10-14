// Extern
import React, { useEffect } from "react";
import { IntlProvider } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
// Intern
import { loginSuccess, logout } from "@redux/firebase/authSlice.ts";
import { RootState } from "../redux/store.ts";
import { auth } from "@utils/auth/firebaseConfig.ts";

type WrapperProps = {
    children: React.ReactNode;
};

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    const intlState = useSelector((state: RootState) => state.intl);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(
                    loginSuccess({ uid: user.uid, email: user.email || "" }),
                );
            } else {
                dispatch(logout());
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    return (
        <IntlProvider locale={intlState.locale} messages={intlState.messages}>
            {children}
        </IntlProvider>
    );
};

export default Wrapper;
