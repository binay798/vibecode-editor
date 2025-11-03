import { configureStore, combineReducers } from "@reduxjs/toolkit";
import editorReducer from "./redux/editor/editor.slice";
import codeDataReducer from "./redux/codeData/codeData.slice";
import projectReducer from "./redux/projects/projects.slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const rootReducers = combineReducers({
  editor: editorReducer,
  codeData: codeDataReducer,
  projects: projectReducer,
});

// 2️⃣ Persist config
const persistConfig = {
  key: "root",
  storage,
};

// 3️⃣ Wrap persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});
// 5️⃣ Create persistor
export const persistor = persistStore(store);
