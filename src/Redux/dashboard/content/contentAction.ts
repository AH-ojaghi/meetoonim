// import { createAsyncThunk } from "@reduxjs/toolkit";
// import {createAsyncThunk} from "@reduxjs/toolkit";
import { DefaultResponse } from "../../mainSlice";
import contentRequest from "../../../requests/contentRequest";
import {
  toast422,
  toastError,
} from "../../../utils/funcions";
import { AxiosResponse } from "axios";
import { LaravelValidationErrorType } from "../../../utils/types";
import {createAsyncThunk} from "@reduxjs/toolkit";
// import { createAsyncThunk } from "@reduxjs/toolkit";
//
export const getPostContent = createAsyncThunk(
  "postContent/getAll",
  async (): Promise<DefaultResponse> => {
    try {
      //hello world
      
      const response: AxiosResponse =await contentRequest.getPostContent();
      if (response.status === 200) {
        return {
          status: response.status,
          data: response.data.data,
        };
      } else if (response.status === 422) {
        console.log("response.data");
        const errors =
          (await response.data) as LaravelValidationErrorType;
        toast422(errors);
        return {
          status: response.status,
          data: errors,
        };
      } else {
        toastError();
        return {
          status: response.status,
          data: null,
        };
      }
    } catch (e) {
      // toastError();
      return {
        status: 500,
        data: null,
      };
    }
  }
);
