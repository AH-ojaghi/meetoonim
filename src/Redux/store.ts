import modalReducer from "redux/components/modalSlice";
import tabsReducer from "redux/components/tabsSlice";
import routeSlice from "redux/tools/routeSlice";
import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import cropSlice from "redux/tools/cropSlice";
import progressSlice from "./tools/progressSlice";
import productsSlice from "redux/dashboard/products/productsSlice";
import productPageSlice from "./dashboard/productPage/productPageSlice";
import mediaViewSlice from "./tools/viewMediaSlice";

const rootReducer = {
    modal: modalReducer,
    tabs: tabsReducer,
    route: routeSlice,
    adminProducts: productsSlice,
    productPage: productPageSlice,
    crop: cropSlice,
    mediaView: mediaViewSlice,
    progress: progressSlice,
};

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;