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

// Type de l'état du store global
export type RootState = ReturnType<typeof store.getState>;

// Type correct pour utiliser des actions async avec le useDispatch hook
export type AppDispatch = typeof store.dispatch;
