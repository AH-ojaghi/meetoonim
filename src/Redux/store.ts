import { configureStore } from "@reduxjs/toolkit";
import postActionSlice from "./dashboard/postActionSlice";
import contentSlice from "./dashboard/content/contentSlice";
//
const rootReducer = {
  postAction: postActionSlice,
  contentAction: contentSlice,
};
//
const store = configureStore({
  reducer: rootReducer,
});
//
export type RootState = ReturnType<
  typeof store.getState
>;
export type AppDispatch = typeof store.dispatch;
export default store;
