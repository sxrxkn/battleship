import { combineReducers, configureStore } from "@reduxjs/toolkit";

import gameCharacteristicsReducer from "./reducers/GameTypeSlice";
import botFieldReducer from "./reducers/BotFieldSlice";
import generalInfoReducer from "./reducers/GeneralInfoSlice";

import thunk from "redux-thunk";
import { persistConfig } from "../redux-persist-config";
import { persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  gameCharacteristicsReducer,
  botFieldReducer,
  generalInfoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
// export type AppStore = ReturnType<typeof store>;
export type AppDispatch = typeof store.dispatch;
