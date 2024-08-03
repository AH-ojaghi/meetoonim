import {createSlice} from "@reduxjs/toolkit";
import {DefaultResponse, DefaultStates} from "redux/mainSlice";
import Product from "../../../models/product";
import {LaravelValidationErrorType} from "../../../utils/types";
import {getProductById} from "./productPageAction";

interface State extends DefaultStates {
    product: Product | null;
    submitLoading: boolean;
}

const initialState: State = {
    product: null,
    submitLoading: false,
    loading: false,
    validationErrors: null,
};

const ProductPageSlice = createSlice({
    name: 'productPage',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getProductById.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.loading = false;
            const response = action.payload;
            if (response.status === 200) {
                state.product = new Product(response.data);
                console.log(state.product);
            } else if (response.status === 422) {
                state.validationErrors = response.data as LaravelValidationErrorType;
            }
        })
        builder.addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
            }
        )
    }
});

export default ProductPageSlice.reducer;