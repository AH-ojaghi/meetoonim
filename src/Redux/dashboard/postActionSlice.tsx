import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

const myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbWVldG9vbmltLmNvbS9hcGkvdjEvdXNlcnMvbG9naW4iLCJpYXQiOjE3MjE2Mjg0MTIsImV4cCI6MTcyNjQyODQxMiwibmJmIjoxNzIxNjI4NDEyLCJqdGkiOiJYcnhjcjVYcHFaVWN4dzh6Iiwic3ViIjoiMjE4OTIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.xoGfmLwAp4rAdXmQ_sC5cvVhvzp4N3HSRzUEoztCP2Y"
);

const requestOptions: RequestInit = {
  headers: myHeaders,
  redirect: "follow",
};

export const likePostAsync = createAsyncThunk(
  "postAction/likePost",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://meetoonim.com/api/v1/posts/${id}/like`,
        {
          ...requestOptions,
          method: "PUT",
        }
      );
      if (!response.ok)
        throw new Error(
          "Network response was not ok"
        );
      const result = await response.json();
      return { id, message: result.message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postActionSlice = createSlice({
  name: "postAction",
  initialState: [
    { id: null, likes: 0, isLike: false },
  ],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        likePostAsync.fulfilled,
        (state, action) => {
          const [post] = state;
          post.id = action.payload.id;
          if (post.isLike) post.likes += 1;
          if (!post.isLike && post.likes > 0)
            post.likes -= 1;
          post.isLike = !post.isLike;

          // const post = state.find((post) => post.id === action.payload.id);
          // if (post) {
          //   post.likes += 1;
          //   post.isLiked = true;
          //   post.message = action.payload.message;
          // } else {
          //   state.push({ id: action.payload.id, likes: 1, isLiked: true, message: action.payload.message });
          // }
        }
      )
      .addCase(
        likePostAsync.pending,
        (state, action) => {
          console.log("Loading ...");
        }
      );
  },
});

export default postActionSlice.reducer;
