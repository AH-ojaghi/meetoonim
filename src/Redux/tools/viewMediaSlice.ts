import { createSlice } from '@reduxjs/toolkit';
import {ReactElement} from "react";
import Media from "../../models/media";

interface MediaViewState {
  media: Media[];
  selectedIndex: number;
}

//payload is must be contains a css class name and content

const initialState: MediaViewState = {
  media: [],
  selectedIndex: 0,
};


export const mediaViewSlice = createSlice({
  name: 'mediaViewImage',
  initialState,
  reducers: {
    setMediaView: (state, action: {payload: { media: Media[], index: number}}) => {
      state.media = action.payload.media;
      state.selectedIndex = action.payload.index;
    },
    remMediaView: (state) => {
      state.media = [];
      state.selectedIndex = 0;
    },
  },
});

export const { setMediaView, remMediaView } = mediaViewSlice.actions;
export default mediaViewSlice.reducer;