import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import {LaravelValidationErrorType} from "utils/types";
import {toast422, toastError} from "utils/funcions";
import {DefaultResponse} from "../../mainSlice";
import ProductRequests from "../../../requests/productRequests";
import {MediaType} from "../../../models/media";
import store from "redux/store";
import {remProgress, setProgress} from "../../tools/progressSlice";

export interface ProductCredentials {
    title: string,
    categoryId: number,
    description: string,
    price: number,
    quantity: number,
    mediaUrls: File[],
    cover: File[],
    coverTypes: MediaType[],
    mediaTypes: MediaType[],
}

export interface ProductCreateCredentials extends ProductCredentials {
}

export interface ProductUpdateCredentials extends ProductCredentials {
    id: number,
    deleteMediaIds: number[],
}

export const submit = createAsyncThunk(
    'products/post',
    async (credentials: ProductCreateCredentials): Promise<DefaultResponse> => {
        try {
            const response: AxiosResponse = await ProductRequests.create(credentials, (percentage: number) => {
                console.log('progressEvent', percentage);
                store.dispatch(setProgress(percentage));
            });
            console.log('response.status', response.status);
            if (response.status === 200 || response.status === 201) {
                const data = response.data;
                return {status: response.status, data}
            } else if (response.status === 422) {
                console.log('response.data');
                const errors = await response.data as LaravelValidationErrorType;
                toast422(errors);
                return {
                    status: response.status,
                    data: errors
                }
            } else {
                toastError();
                return {
                    status: response.status,
                    data: null
                }
            }
            return {
                status: 200,
                data: null
            }
        } catch (e) {
            // toastError();
            store.dispatch(remProgress());
            return {
                status: 500,
                data: null
            }
        }
    }
)

export const getAll = createAsyncThunk(
    'products/getAll',
    async (): Promise<DefaultResponse> => {
        try {
            //hello world
            const response: AxiosResponse = await ProductRequests.getAllProducts()
            if (response.status === 200) {
                return {status: response.status, data: response.data.data}
            } else if (response.status === 422) {
                console.log('response.data');
                const errors = await response.data as LaravelValidationErrorType;
                toast422(errors);
                return {
                    status: response.status,
                    data: errors
                }
            } else {
                toastError();
                return {
                    status: response.status,
                    data: null
                }
            }
        } catch (e) {
            // toastError();
            return {
                status: 500,
                data: null
            }
        }
    }
)

//remove
export const remove = createAsyncThunk(
    'products/remove',
    async (id: number): Promise<DefaultResponse> => {
        try {
            const response: AxiosResponse = await ProductRequests.remove(id)
            if (response.status === 200) {
                return {status: response.status, data: id}
            } else if (response.status === 422) {
                console.log('response.data');
                const errors = await response.data as LaravelValidationErrorType;
                toast422(errors);
                return {
                    status: response.status,
                    data: errors
                }
            } else {
                toastError();
                return {
                    status: response.status,
                    data: null
                }
            }
        } catch (e) {
            // toastError();
            return {
                status: 500,
                data: null
            }
        }
    }
)


//update
export const update = createAsyncThunk(
    'products/update',
    async (credentials: ProductUpdateCredentials): Promise<DefaultResponse> => {
        try {
            const response: AxiosResponse = await ProductRequests.update(credentials)
            if (response.status === 200) {
                return {status: response.status, data: response.data.data}
            } else if (response.status === 422) {
                console.log('response.data');
                const errors = await response.data as LaravelValidationErrorType;
                toast422(errors);
                return {
                    status: response.status,
                    data: errors
                }
            } else {
                toastError();
                return {
                    status: response.status,
                    data: null
                }
            }
        } catch (e) {
            // toastError();
            return {
                status: 500,
                data: null
            }
        }
    }
)
