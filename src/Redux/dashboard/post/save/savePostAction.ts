import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import savePostRequest from "../../../../requests/savePostRequest";
import {
  toast422,
  toastError,
} from "../../../../utils/funcions";
import { LaravelValidationErrorType } from "../../../../utils/types";
//
export const savePostAsyncAction =
  createAsyncThunk(
    "savePostActions/update",
    async (id: number) => {
      try {
        const response: AxiosResponse =
          await savePostRequest.update(id);
        if (
          response.status === 200 ||
          response.status === 204
        ) {
          return {
            status: response.status,
            data: response.data,
            id,
          };
        } else if (response.status === 422) {
          console.log("response.data");
          const errors =
            (await response.data) as LaravelValidationErrorType;
          toast422(errors);
          return {
            status: response.status,
            data: errors,
            id,
          };
        } else {
          toastError();
          return {
            status: response.status,
            data: null,
            id: null,
          };
        }
      } catch (e) {
        // toastError();
        return {
          status: 500,
          data: null,
          id,
        };
      }
    }
  );
