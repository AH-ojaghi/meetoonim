import { createSlice } from '@reduxjs/toolkit';
import {ReactElement} from "react";

interface CropState {
  img?: File;
  result?: File;
}

//payload is must be contains a css class name and content

const initialState: CropState = {
};


export const cropSlice = createSlice({
  name: 'cropImage',
  initialState,
  reducers: {
    setCrop: (state, action: {payload: File}) => {
      state.img = action.payload;
    },
    remCrop: (state) => {
      state.img = undefined;
    },
    setCropResult: (state, action: {payload: File|undefined}) => {
        state.result = action.payload;
    }
  },
});

export const { setCrop, remCrop, setCropResult } = cropSlice.actions;
export default cropSlice.reducer;