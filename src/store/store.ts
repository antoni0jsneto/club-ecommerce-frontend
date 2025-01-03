// para usar com o createStore (forma antiga)
// import { legacy_createStore as createStore, applyMiddleware } from "redux";

import rootReducer from "./root-reducer";
import logger from "redux-logger";

// @ts-ignore
import storage from "redux-persist/lib/storage";
// @ts-ignore
import persistReducer from "redux-persist/es/persistReducer";
// @ts-ignore
import persistStore from "redux-persist/es/persistStore";
import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["cartReducer"],
};

const persistedRootReducer: typeof rootReducer = persistReducer(
    persistConfig,
    rootReducer
);

// forma antiga
// const persistedRootReducer = persistReducer(persistConfig, rootReducer);

// forma antiga
// export const store = createStore(
//     persistedRootReducer,
//     applyMiddleware(thunk, logger)
// );

export const store = configureStore({
    reducer: persistedRootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true,
            serializableCheck: false,
        }).concat(logger),
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

// forma antiga
// export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
