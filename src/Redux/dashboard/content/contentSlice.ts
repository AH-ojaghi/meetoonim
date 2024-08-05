import { createSlice } from "@reduxjs/toolkit";
import { DefaultStates } from "../../mainSlice";
import { getPostContent } from "./contentAction";
import store from "../../store";
import Post from "../../../models/post";
//
interface State extends DefaultStates {
  loading: boolean;
  data: Post[];
}

const initialState: State = {
  data: [],
  loading: false,
  validationErrors: null,
};
//
const contentSlice = createSlice({
  name: "postContent",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        getPostContent.fulfilled,
        (state, action) => {
          state.loading = false;
          const response = action.payload.data;
          const posts: Post[] = [];
          for (
            let i = 0;
            i < response.data.length;
            i++
          ) {
            const post = response.data[i];
            posts.push(
              new Post({
                id: post.id,
                title: post.title,
                description: post.description,
                likes_count: post.likes_count,
                comments_count:
                  post.comments_count,
                views_count: post.views_count,
                is_liked: post.is_liked,
                is_bookmarked: post.is_bookmarked,
                user: post.user,
                media: post.media,
                likes: post.likes,
                comments: post.comments,
                created_at: post.created_at,
                updated_at: post.updated_at,
              })
            );
          }
        }
      )
      .addCase(
        getPostContent.rejected,
        (state, action) => {
          state.loading = false;
          console.error("rejected request");
        }
      )
      .addCase(
        getPostContent.pending,
        (state, action) => {
          state.loading = true;
          console.info("Loading ...");
        }
      );
  },
});

export default contentSlice.reducer;
