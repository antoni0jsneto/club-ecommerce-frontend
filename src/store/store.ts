import { legacy_createStore as createStore, applyMiddleware } from "redux";
import rootReducer from "./root-reducer";
import logger from "redux-logger";
import { thunk } from "redux-thunk";

// @ts-ignore
import storage from "redux-persist/lib/storage";
// @ts-ignore
import persistReducer from "redux-persist/es/persistReducer";
// @ts-ignore
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["cartReducer"],
};

// const persistedRootReducer: typeof rootReducer = persistReducer(
//     persistConfig,
//     rootReducer
// );

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedRootReducer,
    applyMiddleware(thunk, logger)
);
export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
