import { createSlice } from "@reduxjs/toolkit";
import { likePostAsync } from "./postAction"; // update
import { DefaultStates } from "../../mainSlice";
//
interface State extends DefaultStates {
  id: number;
  likes: number;
  isLike: boolean;
}

const initialState: State = {
  id: null,
  likes: 0,
  isLike: false,
};

//
const postSLice = createSlice({
  name: "postActions",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        likePostAsync.fulfilled,
        (state, action) => {
          const response = action.payload; // before : const [post] = state
          state.isLike = !state.isLike;
          if (response.isLike)
            response.likes += 1;
          if (
            !response.isLike &&
            response.likes > 0
          )
            response.likes -= 1;
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

export default postSLice.reducer;
