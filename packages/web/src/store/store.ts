import { configureStore } from "@reduxjs/toolkit";
import {
  chatsReducer,
  pageLoadingReducer,
  responsiveReducer,
  userReducer,
} from "@/Slices";

export const store = configureStore({
  /* object of slice reducers to be combined */
  reducer: {
    responsive: responsiveReducer,
    pageLoading: pageLoadingReducer,
    user: userReducer,
    chats: chatsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type of reducers object for dispatch
export type AppDispatch = typeof store.dispatch;
