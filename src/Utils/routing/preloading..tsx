import React, {ReactNode, useEffect} from 'react';
import {IPath} from "../types";
import {useDispatch} from "react-redux";
import {AsyncThunk, ThunkDispatch} from "@reduxjs/toolkit";
import {useLocation, useParams} from "react-router-dom";

const CheckPreloadings: React.FC<{ children: ReactNode, path: IPath }> = ({children, path}) => {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const params = useParams();

    const loadPreloadings = () => {
        console.log('prmsx');
        if (path.preLoadingMethod) {
            path.preLoadingMethod.forEach((method, i) => {
                let values: {[key: string]: any} = {};
                if (method.values) {
                    method.values.forEach(v => {
                       values[v] =  params[v];
                    });
                    console.log('prms', values);
                }
                dispatch(method.action(values));
            });
        }
    }

    useEffect(() => {
        console.log('isloaded path', path.isLoaded, path.path);
        if (!path.isLoaded) {
            loadPreloadings();
            path.isLoaded = true;
        }
    }, [path]);


    return (
        <>
            {children}
        </>
    );
};

export default CheckPreloadings;
