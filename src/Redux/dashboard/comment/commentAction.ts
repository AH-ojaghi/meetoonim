import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { toast422, toastError } from "../../../utils/funcions";
import { LaravelValidationErrorType } from "../../../utils/types";
import commentRequest from "../../../requests/commentRequest";
// import { parseNumber } from "react-advanced-cropper";
import { DefaultResponse } from "../../mainSlice";
import { parseNumber } from "react-advanced-cropper";
//get data
//
// export const getCommentsModalAction = createAsyncThunk(e
//   "commentsModal/getAll",
//   async (data: { [key: string]: any }) => {
//       // console.log("console.log", data);
//  //
//     try {
//       const response: AxiosResponse = await commentRequest.authGet(
//         // parseNumber(data.id)
//       );
interface ExtendedResponse extends DefaultResponse {
  data:{id:string};
  id: number
}

export const getCommentsModalAction = createAsyncThunk(
  "postContent/getAll",
  //Promise<DefaultResponse >
  async (data: { [key: string]: any }): Promise<ExtendedResponse> => {
    console.log("console.log --ID --commentAction.tsx" ,parseNumber(data.id));
    
    try {
      //hello world
      const response: AxiosResponse = await commentRequest.authGet(parseNumber(data.id));
      console.log("response: ", response)
      console.log("data id: ", parseNumber(data.id))
      if (response.status === 200) {
        return {
          status: response.status,
          data: response.data,
          id:parseNumber(data.id)
        };
      } else if (response.status === 422) {
        // console.log("response.data");
        const errors = (await response.data) as LaravelValidationErrorType;
        toast422(errors);
        return {
          status: response.status,
          data: errors,
          id:parseNumber(data.id)
        };
      } else {
        toastError();
        return {
          status: response.status,
          data: null,
          id:parseNumber(data.id)
        };
      }
    } catch (e) {
      // toastError();
      return {
        status: 500,
        data: null,
        id:parseNumber(data.id)
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
