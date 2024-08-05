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
  id: 0,
  likes: 0,
  isLike: true,
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

          state.isLike=null;
          if (action.payload.status === 200)
            state.isLike = true;
          else state.isLike = false;
          if (state.isLike) state.likes += 1;
          if (!state.isLike && state.likes > 0)
            state.likes -= 1;
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
