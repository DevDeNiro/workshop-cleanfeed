// Extern
import React, { useEffect } from "react";
import { IntlProvider } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, User } from "firebase/auth";
// Intern
import { RootState } from "../redux/store.ts";
import { auth } from "@utils/auth/firebaseConfig.ts";
import { setUser } from "@redux/firebase/authSlice.ts";

type WrapperProps = {
    children: React.ReactNode;
};

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    const dispatch = useDispatch();
    const intlState = useSelector((state: RootState) => state.intl);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            dispatch(setUser(user));
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
