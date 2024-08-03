import { createSlice } from '@reduxjs/toolkit';
import {ReactElement} from "react";

interface ProgressState {
  progress: number;
}

//payload is must be contains a css class name and content

const initialState: ProgressState = {
    progress: 0,
};


export const progressSlice = createSlice({
  name: 'progressBar',
  initialState,
  reducers: {
    setProgress: (state, action: {payload: number}) => {
      state.progress = action.payload;
      if (state.progress === 100) {
        state.progress = 0;
      }
    },
    remProgress: (state) => {
      state.progress = 0;
    },
  },
});

export const { setProgress, remProgress } = progressSlice.actions;
export default progressSlice.reducer;