// import {openModal} from "../redux/components/modalSlice";
import { openModal } from "../Redux/components/modalSlice";
import store from "../Redux/store";
import toast from 'react-hot-toast';
import {IPath, LaravelValidationErrorType} from "./types";
import React from "react";
import {serverAsset} from "../services/connectionConfig";
import {replacementShopAvatar, replacementUserAvatar} from "./constants";

export function toastError(message?: string | null) {
    toast.error(message || "خطایی رخ داده است");
}

//422 validation errors
export function toast422(errors: LaravelValidationErrorType) {
    const firstError = errors.message;
    toast.custom((t) => {
        return (
            <div
                className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                <div className="flex">
                    <div className="flex border-l border-gray-200">
                        <button
                            onClick={() => {
                                t.visible = false;
                                toast.dismiss(t.id);
                            }}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            Close
                        </button>
                    </div>
                    <div className="p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 pt-0.5">
                                ⚠️
                            </div>
                            <div className="mr-3 flex-1">
                                <p className="text-sm font-medium text-gray-900 mb-0">
                                    {firstError}
                                </p>

                                {/*if errors.errors length > 1 then show all errors*/}
                                {Object.keys(errors.errors).length > 1 && (
                                    <ul className="mt-1 text-sm text-[#DE0000] list-disc list-inside">
                                        {Object.keys(errors.errors).map((key, index) => (
                                            <li key={index}>{errors.errors[key]}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    });
}

export function toastSuccess(message?: string | null) {
    toast.success(message || "عملیات با موفقیت انجام شد");
}


export function defaultModal(info: String | React.ReactNode,
                            onConfirm?: () => void,
                             ) {
    store.dispatch(openModal({
        content: info,
        onConfirm: onConfirm,
    }));
}


export function convertObjectOfCamelCaseToObjectOfKeyBySnakeCase(
    inputObject: Record<string, any>,
    removingKeys: string[] = []
): Record<string, any> {
    const snakeCaseObject: Record<string, any> = {};

    for (const key in inputObject) {
        if (Object.prototype.hasOwnProperty.call(inputObject, key)) {
            const snakeCaseKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();

            // Check if the key should be removed
            // and value must not be null or undefined
            if (!removingKeys.includes(key) && inputObject[key] !== null && inputObject[key] !== undefined) {
                snakeCaseObject[snakeCaseKey] = inputObject[key];
            }

        }
    }

    return snakeCaseObject;
}

export const isIndexRoute = (pathname: string): boolean => {
    return !pathname.startsWith("/dashboard");
}

export const NetworkImage: React.FC<{ url: string, className?: string, alt: string, onClick?: ()=>void, props?: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> }> = ({url, alt, className, onClick, props }) => {
    return <img {...props} src={serverAsset(url)} alt={alt} className={className} onChange={onClick} />;
}


type UserType = 'guest' | 'shop' | 'user';

let _userType: UserType | undefined = undefined;

export const getReplacementNullAvatar = (isShop: boolean = false): string => {
    return serverAsset(isShop ? replacementShopAvatar : replacementUserAvatar);
}


export const openModalById = (id: string) => {
    (document.querySelector(`#${id}`) as HTMLInputElement).checked = true;
}
export const moneyFormat = (price: number, isUseCurrencyCode: boolean = false ,  options: { currencyCodeInput?: 'IRR' | 'USD'} = {}) => {

    const { currencyCodeInput = 'IRR'} = options;

    let currencyCode: string|undefined;

    if (isUseCurrencyCode) {
        switch (currencyCodeInput) {
            case 'USD':
                currencyCode = 'USD';
                break;
            default:
            case 'IRR':
                currencyCode = 'ریال';
                break;
        }
    }

    return new Intl.NumberFormat('en-US',).format(price) + ' ' + (currencyCode ?? '');
}

export function copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text)
        .then(() => {
            toastSuccess('متن کپی شد')
        })
        .catch((err) => {
            toastError()
        });
}



