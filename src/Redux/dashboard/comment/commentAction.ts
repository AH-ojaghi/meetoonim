import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { toast422, toastError } from "../../../utils/funcions";
import { LaravelValidationErrorType } from "../../../utils/types";
import commentRequest from "../../../requests/commentRequest";
//get data
console.log('console.log');

export const getCommentsModalAction = createAsyncThunk(
  "commentsModal/getAll",
  async (data: { [key: string]: any }) => {
      console.log("console.log", data);
      //
    try {
      const response: AxiosResponse = await commentRequest.authGet(
        parseNumber(data.id)
      );
      if (response.status === 200) {
        return {
          status: response.status,
          data: response.data,
          id,
        };
      } else if (response.status === 422) {
        console.log("response.data");
        const errors = (await response.data) as LaravelValidationErrorType;
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

function parseNumber(id: any): number {
  throw new Error("Function not implemented.");
}
// post data
// export const getCommentsModalAction = createAsyncThunk(
//     "commentsModal/authGet",
//     async (id: number) => {
//       try {
//         const response: AxiosResponse = await commentRequest.authGet(id);
//         if (response.status === 200) {
//           return {
//             status: response.status,
//             data: response.data,
//             id,
//           };
//         } else if (response.status === 422) {
//           console.log("response.data");
//           const errors = (await response.data) as LaravelValidationErrorType;
//           toast422(errors);
//           return {
//             status: response.status,
//             data: errors,
//             id,
//           };
//         } else {
//           toastError();
//           return {
//             status: response.status,
//             data: null,
//             id: null,
//           };
//         }
//       } catch (e) {
//         // toastError();
//         return {
//           status: 500,
//           data: null,
//           id,
//         };
//       }
//     }
//   );
