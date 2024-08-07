import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { toast422, toastError } from "../../../utils/funcions";
import { LaravelValidationErrorType } from "../../../utils/types";
import commentRequest from "../../../requests/commentRequest";
// import { parseNumber } from "react-advanced-cropper";
import { DefaultResponse } from "../../mainSlice";
//get data
//
// export const getCommentsModalAction = createAsyncThunk(
//   "commentsModal/getAll",
//   async (data: { [key: string]: any }) => {
//       // console.log("console.log", data);
//  //
//     try {
//       const response: AxiosResponse = await commentRequest.authGet(
//         // parseNumber(data.id)
//       );
interface ExtendedResponse extends DefaultResponse {
  id: number;
}

export const getCommentsModalAction = createAsyncThunk(
  "postContent/getAll",
  //Promise<DefaultResponse >
  async (id: number): Promise<ExtendedResponse> => {
    console.log("console.log --ID --commentAction.tsx" ,id);
    
    try {
      //hello world
      const response: AxiosResponse = await commentRequest.authGet(id);
      if (response.status === 200) {
        return {
          status: response.status,
          data: response.data,
          id,
        };
      } else if (response.status === 422) {
        // console.log("response.data");
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
          id,
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
