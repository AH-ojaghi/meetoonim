import React, {ReactNode} from "react";
import {AsyncThunk, AsyncThunkAction} from "@reduxjs/toolkit";

export type     LaravelValidationErrorType = {
    message: string;
    errors: {
        [key: string]: string[];
    }
}

export interface IPath {
    path: string;
    name: string;
    registered?: boolean;
    exact?: boolean;
    middleware?: React.FC<{children: ReactNode}>[];
    preLoadingMethod?: {action: AsyncThunk<any, any, any>; values?: string[]}[];
    isLoaded?: boolean;
}

export interface IRoute {
    component: ReactNode;
    path: IPath;
    children?: IRoute[];
}
