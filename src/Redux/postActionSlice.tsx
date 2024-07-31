import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const likePostAsync = createAsyncThunk(
  "postAction/likePost",
  async (id: number, { rejectWithValue }) => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbWVldG9vbmltLmNvbS9hcGkvdjEvdXNlcnMvbG9naW4iLCJpYXQiOjE3MjE2Mjg0MTIsImV4cCI6MTcyNjQyODQxMiwibmJmIjoxNzIxNjI4NDEyLCJqdGkiOiJYcnhjcjVYcHFaVWN4dzh6Iiwic3ViIjoiMjE4OTIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.xoGfmLwAp4rAdXmQ_sC5cvVhvzp4N3HSRzUEoztCP2Y"
    );

    const requestOptions: RequestInit = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };

    const url = `https://meetoonim.com/api/v1/posts/${id}/like`;

    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      return { id, message: result.message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const savePostAsync = createAsyncThunk(
  "postAction/savePost",
  async (id: number, { rejectWithValue }) => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbWVldG9vbmltLmNvbS9hcGkvdjEvdXNlcnMvbG9naW4iLCJpYXQiOjE3MjE2Mjg0MTIsImV4cCI6MTcyNjQyODQxMiwibmJmIjoxNzIxNjI4NDEyLCJqdGkiOiJYcnhjcjVYcHFaVWN4dzh6Iiwic3ViIjoiMjE4OTIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.xoGfmLwAp4rAdXmQ_sC5cvVhvzp4N3HSRzUEoztCP2Y"
    );

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    const url = `https://meetoonim.com/api/v1/bookmarks/${id}`;

    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      return { id, message: result.message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeBookmarkAsync = createAsyncThunk(
  "postAction/removeBookmark",
  async (id: number, { rejectWithValue }) => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbWVldG9vbmltLmNvbS9hcGkvdjEvdXNlcnMvbG9naW4iLCJpYXQiOjE3MjE2Mjg0MTIsImV4cCI6MTcyNjQyODQxMiwibmJmIjoxNzIxNjI4NDEyLCJqdGkiOiJYcnhjcjVYcHFaVWN4dzh6Iiwic3ViIjoiMjE4OTIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.xoGfmLwAp4rAdXmQ_sC5cvVhvzp4N3HSRzUEoztCP2Y"
    );
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    const url = `https://meetoonim.com/api/v1/bookmarks/${id}`;

    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      return { id, message: result.message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postActionSlice = createSlice({
  name: "postAction",
  initialState: [],
  reducers: {
    likePost: (state, action) => {
      const post = state.find((post) => post.id === action.payload.id);
      if (post) {
        post.likes += 1;
        post.isLiked = true;
      } else {
        state.push({ id: action.payload.id, likes: 1, isLiked: true });
      }
    },
    dislikePost: (state, action) => {
      const post = state.find((post) => post.id === action.payload.id);
      if (post && post.likes > 0) {
        post.likes -= 1;
        post.isLiked = false;
      }
    },
    savePost: (state, action) => {
      const post = state.find((post) => post.id === action.payload.id);
      if (post) {
        post.isBookmarked = true;
      } else {
        state.push({ id: action.payload.id, isBookmarked: true });
      }
    },
    removeBookmark: (state, action) => {
      const post = state.find((post) => post.id === action.payload.id);
      if (post) {
        post.isBookmarked = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(likePostAsync.fulfilled, (state, action) => {
        if (action.payload.message === "Like added successfully!") {
          const post = state.find((post) => post.id === action.payload.id);
          if (post) {
            post.likes += 1;
            post.isLiked = true;
          } else {
            state.push({ id: action.payload.id, likes: 1, isLiked: true });
          }
        }
      })
      .addCase(savePostAsync.fulfilled, (state, action) => {
        if (action.payload.message === "Bookmark added successfully!") {
          const post = state.find((post) => post.id === action.payload.id);
          if (post) {
            post.isBookmarked = true;
          } else {
            state.push({ id: action.payload.id, isBookmarked: true });
          }
        }
      })
      .addCase(removeBookmarkAsync.fulfilled, (state, action) => {
        if (action.payload.message === "Bookmark removed successfully!") {
          const post = state.find((post) => post.id === action.payload.id);
          if (post) {
            post.isBookmarked = false;
          }
        }
      });
  },
});

export const { likePost, dislikePost, savePost, removeBookmark } =
  postActionSlice.actions;
export default postActionSlice.reducer;
