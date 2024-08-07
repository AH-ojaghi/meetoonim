import { createSlice } from "@reduxjs/toolkit";
import { DefaultStates } from "../../mainSlice";
import { getCommentsModalAction } from "./commentAction";
//
interface State extends DefaultStates {
  id: number;
  data: object | null;
  loading: boolean;
  validationErrors: string | null;
}

const initialState: State = {
  id: 0,
  data: {},
  loading: false,
  validationErrors: null,
};
//
const commentSlice = createSlice({
  name: "commentsModal",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //get data
    builder
      .addCase(getCommentsModalAction.pending, (state, action) => {
        state.loading = true;
        console.info("Loading ...");
      })
      .addCase(getCommentsModalAction.fulfilled, (state, action) => {
        console.log(action.payload);
        
        state.loading = false;
        const response = action.payload.data.data;
        state.data = response;
        state.id = action.payload.id
      })
      .addCase(getCommentsModalAction.rejected, (state, action) => {
        state.loading = false;
        console.error("Rejected request !");
      });
    //post data
  },
});
//
export default commentSlice.reducer;
