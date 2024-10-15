import { configureStore } from "@reduxjs/toolkit";

import intlReducer from "./intl/intlSlice";
import menuReducer from "./menu/menuSlice";
import firebaseReducer from "./firebase/authSlice";

export const store = configureStore({
    reducer: {
        intl: intlReducer,
        menu: menuReducer,
        firebase: firebaseReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
