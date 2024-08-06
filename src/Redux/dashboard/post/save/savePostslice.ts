import { createSlice } from "@reduxjs/toolkit";
import { DefaultStates } from "../../../mainSlice";
import { savePostAsyncAction } from "./savePostAction";
//
interface State extends DefaultStates {
  id: number;
  isBookmarked: boolean | null;
  loading: boolean;
  validationErrors: string | null;
}

const initialState: State = {
  id: 0,
  isBookmarked: null,
  loading: false,
  validationErrors: null,
};
//
const savePostSLice = createSlice({
  name: "savePostActions",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        savePostAsyncAction.pending,
        (state, action) => {
          console.info("Loading ...");
        }
      )
      .addCase(
        savePostAsyncAction.fulfilled,
        (state, action) => {
          if (action.payload.status === 200)
            state.isBookmarked = true;
          else state.isBookmarked = false;
        }
      )
      .addCase(
        savePostAsyncAction.rejected,
        (state, action) => {
          console.error("Rejected request !");
        }
      );
  },
});
//
export default savePostSLice.reducer;
