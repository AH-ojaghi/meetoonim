import { createSlice } from '@reduxjs/toolkit';
import {ReactNode} from "react";

interface RouteState {
  route?: string;
}

//payload is must be contains a css class name and content

const initialState: RouteState = {
};

export const routeSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setRoute: (state, action: {payload: string}) => {
      state.route = action.payload;
    },
    remRoute: (state) => {
      state.route = undefined;
    },
  },
});

export const { setRoute, remRoute } = routeSlice.actions;
export default routeSlice.reducer;