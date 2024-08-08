import { configureStore } from "@reduxjs/toolkit";
import { Like } from "./slice";




export const store = configureStore({
    reducer: {
        LikePro: Like.reducer
    }
});