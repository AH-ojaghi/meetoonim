import {createSlice} from "@reduxjs/toolkit";
import {DefaultStates} from "redux/mainSlice";
import Product from "../../../models/product";
import {LaravelValidationErrorType} from "../../../utils/types";
import {toastSuccess} from "../../../utils/funcions";
import {getAll, remove, submit, update} from "./productsAction";
import store from "redux/store";

interface State extends DefaultStates {
    products: Product[];
    submitLoading: boolean;
}

const initialState: State = {
    products: [],
    submitLoading: false,
    loading: false,
    validationErrors: null,
};

const ProductsSlice = createSlice({
    name: 'productList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(submit.pending, (state) => {
            state.submitLoading = true
        })
        builder.addCase(submit.fulfilled, (state, action) => {
            state.submitLoading = false;
            const response = action.payload;
            if (response.status === 200 || response.status === 201) {
                const data = response.data.data;
                state.products.unshift(new Product({...data, parentId: data.parent_id}));
                toastSuccess('محصول با موفقیت اضافه شد');
            } else if (response.status === 422) {
                state.validationErrors = response.data as LaravelValidationErrorType;
            }
        })
        builder.addCase(submit.rejected, (state, action) => {
            state.submitLoading = false;
        })
        builder.addCase(getAll.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAll.fulfilled, (state, action) => {
            state.loading = false;
            const response = action.payload;
            if (response.status === 200) {
                const products: Product[] = [];
                for (let i = 0; i < response.data.length; i++) {
                    const product = response.data[i];
                    products.push(new Product({
                        id: product.id,
                        title: product.title,
                        code: product.code,
                        category_id: product.category_id,
                        price: product.price,
                        category: product.category,
                        description: product.description,
                        quantity: product.quantity,
                        media: product.media,
                    }));
                }
                console.log('productszx', products);
                state.products = products;
            } else if (response.status === 422) {
                state.validationErrors = response.data as LaravelValidationErrorType;
            }
        })
        builder.addCase(getAll.rejected, (state, action) => {
                state.loading = false;
            }
        )
        //remove
        builder.addCase(remove.pending, (state) => {
            // state.loading = true
        })
        builder.addCase(remove.fulfilled, (state, action) => {
            // state.loading = false;
            const response = action.payload;
            if (response.status === 200) {
                const index = state.products.findIndex(product => product.id === response.data);
                state.products.splice(index, 1);
                toastSuccess('محصول با موفقیت حذف شد');
            } else if (response.status === 422) {
                state.validationErrors = response.data as LaravelValidationErrorType;
            }
        })
        builder.addCase(remove.rejected, (state, action) => {
                // state.loading = false;
            }
        )

        //update
        builder.addCase(update.pending, (state) => {
            state.submitLoading = true
        })
        builder.addCase(update.fulfilled, (state, action) => {
                state.submitLoading = false;
                const response = action.payload;
                if (response.status === 200) {
                    const index = state.products.findIndex(product => product.id === response.data.id);
                    state.products[index] = new Product({
                        id: response.data.id,
                        title: response.data.title,
                        code: response.data.code,
                        category_id: response.data.category_id,
                        price: response.data.price,
                        category: response.data.category,
                        description: response.data.description,
                        quantity: response.data.quantity,
                        media: response.data.media,
                    });
                    toastSuccess('محصول با موفقیت ویرایش شد');
                } else if (response.status === 422) {
                    state.validationErrors = response.data as LaravelValidationErrorType;
                }
            }
        )
        builder.addCase(update.rejected, (state, action) => {
                state.submitLoading = false;
            }
        )

    },
});

export default ProductsSlice.reducer;