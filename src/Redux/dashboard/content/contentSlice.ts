import { createSlice } from "@reduxjs/toolkit";
import { DefaultStates } from "../../mainSlice";
import { getPostContent } from "./contentAction";
import store from "../../store";
//
interface State extends DefaultStates {
  data: object;
}

const initialState: State = {
  data: {},
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
          console.log(
            state,
            "state from --contentSlice:/fulfilled"
          );
          console.log(
            action,
            "action from --contentSlice:/fulfilled"
          );
        }
      )
      .addCase(
        getPostContent.rejected,
        (state, action) => {
          console.log(
            state,
            "state from --contentSlice:/rejected"
          );
          console.log(
            action,
            "actoin from --contentSlice:/rejected"
          );
        }
      )
      .addCase(
        getPostContent.pending,
        (state, action) => {
          console.log(
            state,
            "state from --contentSlice:/pending"
          );
          console.log(
            action,
            "action from --contentSlice:/pending"
          );
        }
      );
  },
});

export default contentSlice.reducer;
