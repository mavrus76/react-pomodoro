import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit"
import tasksReducer from "./tasks/tasksSlice"
import statsReducer from "./stats/statsSlice"
import pagesReducer from "./pages/pagesSlice"
import timerReducer from "./timers/timerSlice"
import modeReducer from "./mode/modeSlice"
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"

const rootReducer = combineReducers({
  pages: pagesReducer,
  tasks: tasksReducer,
  timers: timerReducer,
  stats: statsReducer,
  mode: modeReducer,
})

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["pages", "stats", "timers"],
  whitelist: ["tasks", "mode"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: {
    root: persistedReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
