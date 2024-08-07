import { createSlice } from "@reduxjs/toolkit";
import { DefaultStates } from "../../mainSlice";
import { getPostContent } from "./contentAction";
import Post from "../../../models/post";
//
interface State extends DefaultStates {
  loading: boolean;
  data: Post[];
}
//
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
          const data = action.payload;
          const response = data.data;
          const posts: Post[] = [];
          for (
            let i = 0;
            i < response?.length;
            i++
          ) {
            const post = response[i];
            // console.log(posts ,'posts --BEFORE_PUSH');
            posts.push(
              {
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
              }
            );
            // console.log(posts ,'posts --AFTER_PUSH');
            state.data = posts;
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