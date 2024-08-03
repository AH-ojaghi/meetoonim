import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import {LaravelValidationErrorType} from "utils/types";
import {toast422, toastError} from "utils/funcions";
import {DefaultResponse} from "../../mainSlice";
import {parseNumber} from "react-advanced-cropper";
import ProductRequests from "../../../requests/productRequests";


export const getProductById = createAsyncThunk(
    'products/getProductById',
    async (data: {[key: string]: any}): Promise<DefaultResponse> => {
        try {
            const response: AxiosResponse = await ProductRequests.getProductById(parseNumber(data.id))
            if (response.status === 200) {
                response.data.data = {...response.data.data}
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
