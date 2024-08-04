import {LaravelValidationErrorType} from "../utils/types";


export interface DefaultStates {
    loading: boolean,
    validationErrors: LaravelValidationErrorType|null
}


export type DefaultResponse = {
    status: number;
    data:any;
}

