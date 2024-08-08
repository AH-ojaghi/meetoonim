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
  loading: true,
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
        console.log(`loooooooooading`);
        
        console.info("Loading ...");
      })
      .addCase(getCommentsModalAction.fulfilled, (state, action) => {
        console.log(`fuuuuuuuuulfild`);
        
        console.log(action.payload, "cooments --Slice");

        const response = action.payload?.data?.data;
        state.data = response;
        state.id = action.payload.id;
        state.loading = false;

      })
      .addCase(getCommentsModalAction.rejected, (state, action) => {
        state.loading = false;
        console.log('reeeeeeeeeeeeeeeeeeeeeejected');
        
        console.error("Rejected request !");
      });
    //post data
  },
});
//
export default commentSlice.reducer;
