// Extern
import React, { useEffect } from "react";
import { IntlProvider } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
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

    // setLogLevel('debug');

    useEffect(() => {
        const checkRedirectResult = async () => {
            try {
                const result = await getRedirectResult(auth);
                console.log("getRedirectResult called");
                if (result) {
                    console.log("Redirect result:", result);
                    if (result.user) {
                        dispatch(loginSuccess(result.user));
                    } else {
                        console.warn("No user in redirect result");
                    }
                } else {
                    console.warn("No redirect result available");
                }
            } catch (error) {
                console.error("Error getting redirect result:", error);
            }
        };

        checkRedirectResult().then((result) =>
            console.log("Redirect result:", result),
        );

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("onAuthStateChanged user:", user);
            if (user) {
                dispatch(loginSuccess(user));
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
