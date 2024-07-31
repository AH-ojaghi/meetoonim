import { configureStore } from '@reduxjs/toolkit';
import postActionReducer from './postActionSlice';

const store = configureStore({
 reducer: {
 postAction: postActionReducer,
 },
});

export default store;