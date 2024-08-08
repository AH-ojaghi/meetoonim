import { createSlice } from "@reduxjs/toolkit";
import { likePostAsyncAction } from "./likePostAction"; // update
import { DefaultStates } from "../../../mainSlice";
//
interface State extends DefaultStates {
  id: number;
  likes: number;
  isLike: boolean | null;
  loading: boolean;
  validationErrors: string | null;
}

const initialState: State = {
  id: 0,
  likes: 0,
  isLike: null,
  loading: false,
  validationErrors: null,
};
//
const likePostActionSlice = createSlice({
  name: "likePostActions",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        likePostAsyncAction.pending,
        (state, action) => {
          console.info("Loading ...");
        }
      )
      .addCase(
        likePostAsyncAction.fulfilled,
        (state, action) => {
          if (action.payload.status === 200)
            state.isLike = true;
          else state.isLike = false;
          //
          if (state.isLike) state.likes += 1;
          if (!state.isLike && state.likes > 0)
            state.likes -= 1;
        }
      )
      .addCase(
        likePostAsyncAction.rejected,
        (state, action) => {
          console.error("Rejected request !");
        }
      );
  },
});

export default likePostActionSlice.reducer;
