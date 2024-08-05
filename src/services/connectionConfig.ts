// services/apiConfig.ts

import Auth from "./savedData/auth";

export const BASE_URL = 'https://meetoonim.com';
export const APP_URL = 'http://localhost:3000';
export const API_BASE_URL = BASE_URL + '/api/v1';

export const API_CONFIG = {
    headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json; charset=UTF-8',
    },
};

export const serverAsset = (path: string) => {
    if (path?.startsWith('http'))
        return path;
    if (path?.startsWith('/')) path = path.substr(1);
    return `${BASE_URL}/${path}`;
}

//logout
export const logout = () => {
    Auth.del();
    window.location.reload();
}

export const getAbsAddress = (url: string) => {
    return APP_URL + (url.startsWith('/') ? url : '/' + url);
}