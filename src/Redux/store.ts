import { configureStore } from "@reduxjs/toolkit";
import likePostActionSlice from "./dashboard/post/like/likePostSlice";
import savePostslice from "./dashboard/post/save/savePostslice";
import contentSlice from "./dashboard/content/contentSlice";
import commentSlice from "./dashboard/comment/commentSlice";
//
const rootReducer = {
  likePostAction: likePostActionSlice,
  savePostAction: savePostslice,
  contentAction: contentSlice,
  commentAction: commentSlice,
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
