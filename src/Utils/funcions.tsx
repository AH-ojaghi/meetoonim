import { openModal } from "../Redux/components/modalSlice";
import store from "../Redux/store";
import toast from "react-hot-toast";
import { IPath, LaravelValidationErrorType } from "./types";
import React from "react";
import { serverAsset } from "../services/connectionConfig";
import { replacementShopAvatar, replacementUserAvatar } from "./constants";
import User from "../models/user";
import { GrAdd } from "react-icons/gr";
// import logo from "../assets/img/coloop-logo-44-min.-copy.png";

export function toastError(message?: string | null) {
  toast.error(message || "خطایی رخ داده است");
}

//422 validation errors
export function toast422(errors: LaravelValidationErrorType) {
  const firstError = errors.message;
  // console.log('errorValidation', firstError)
  // console.log('errorValidation', errors.message)
  toast.custom((t) => {
    return (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex">
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => {
                t.visible = false;
                toast.dismiss(t.id);
              }}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              بستن
            </button>
          </div>
          <div className="p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 pt-0.5">⚠️</div>
              <div className="mr-3 flex-1">
                <p className="text-sm font-medium text-gray-900 mb-0">
                  {firstError}
                </p>

                {/*if errors.errors length > 1 then show all errors*/}
                {Object.keys(errors.errors).length > 1 && (
                  <ul className="mt-1 text-sm text-[#DE0046] list-disc list-inside">
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

export function defaultModal(
  info: String | React.ReactNode,
  onConfirm?: () => void
) {
  store.dispatch(
    openModal({
      content: info,
      onConfirm: onConfirm,
    })
  );
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
      if (
        !removingKeys.includes(key) &&
        inputObject[key] !== null &&
        inputObject[key] !== undefined
      ) {
        snakeCaseObject[snakeCaseKey] = inputObject[key];
      }
    }
  }

  return snakeCaseObject;
}

export const isIndexRoute = (pathname: string): boolean => {
  return !pathname.startsWith("/dashboard");
};

export const NetworkImage: React.FC<{
  url: string;
  className?: string;
  alt: string;
  onClick?: () => void;
  props?: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
}> = ({ url, alt, className, onClick, props }) => {
  return (
    <img
      {...props}
      src={serverAsset(url)}
      alt={alt}
      className={className}
      onChange={onClick}
    />
  );
};

type UserType = "guest" | "shop" | "user" | "auth" | "super_admin";

let _userType: UserType | undefined = undefined;
export const checkUser = (route?: IPath): UserType => {
  if (_userType !== undefined) {
    return _userType;
  }
  const { user, shop } = store.getState().user;

  if (!user) {
    return (_userType = "guest");
  }
  if (user!.is_super_admin) {
    return (_userType = "super_admin");
  }
  if (shop!.id === user.id) {
    return (_userType = "shop");
  }
  if (user.id !== 0 && user.id !== null && user.id !== shop!.id) {
    return (_userType = "user");
  }
  return (_userType = "guest");
};

export const getReplacementNullAvatar = (isShop: boolean = false): string => {
  return serverAsset(isShop ? replacementShopAvatar : replacementUserAvatar);
};

export const getReplacementAvatar = (
  shop?: Shop,
  user?: User,
  isShop?: boolean
): string => {
  if (!user) {
    user = store.getState().user.user;
  }
  const replacement: string = getReplacementNullAvatar(isShop);
  return user && user.avatar ? serverAsset(user.avatar) : replacement;
};

export const getSettingByKey = (key: string): string => {
  console.log("fillfilled2");
  const settings = store.getState().user.settings;
  return settings.find((e) => e.name === key)?.value ?? "";
};

export const openModalById = (id: string) => {
  (document.querySelector(`#${id}`) as HTMLInputElement).checked = true;
};
export const moneyFormat = (
  price: number,
  isUseCurrencyCode: boolean = false,
  options: { currencyCodeInput?: "IRR" | "USD" } = {}
) => {
  const { currencyCodeInput = "IRR" } = options;

  let currencyCode: string | undefined;

  if (isUseCurrencyCode) {
    switch (currencyCodeInput) {
      case "USD":
        currencyCode = "USD";
        break;
      default:
      case "IRR":
        currencyCode = "ریال";
        break;
    }
  }

  return (
    new Intl.NumberFormat("en-US").format(price) + " " + (currencyCode ?? "")
  );
};

type PaginationFunction = {
  callBack: () => void;
  loading: boolean;
};

let loading: boolean = false;
export const pagination = (callBack: () => void) => {
  // window.location.reload()
  const onScroll: EventListener = (event: Event) => {
    const bottom =
      document.documentElement.clientHeight + window.scrollY + 30 >
      document.documentElement.offsetHeight;
    if (bottom) {
      if (!loading) {
        loading = true;
        callBack();
        setTimeout(() => {
          loading = false;
        }, 1000);
      }
    }
  };

  const win: Window = window; // <-- DOM-Window, extends DOM-EventTarget
  win.addEventListener("scroll", onScroll);

  return () => window.removeEventListener("scroll", onScroll);
};

export const loadingComponent = () => (
  <div className="w-full h-full flex justify-center items-center overflow-x-hidden">
    <img
      src={logo}
      alt=""
      className={
        "md:w-[5%] w-[20%] loading loading-infinity mb-6 ml-10 cursor-pointer"
      }
    />
  </div>
);

export const emptyComponent: React.FC<{ htmlFor: string; text: string }> = ({
  htmlFor,
  text,
}) => (
  <label
    htmlFor={htmlFor}
    className="max-w-[150px] flex cursor-pointer btn bg-transparent justify-center items-center w-1/2 h-[150px] border border-dashed border-gray-300 rounded-lg mt-4"
  >
    <div className="flex flex-col justify-center items-center">
      <GrAdd size={40} color={"#9E9E9E"} />
      <span className={"text-[#9E9E9E] text-[14px] mt-2"}>{text}</span>
    </div>
  </label>
);

//get reseller invitaion link
export const getResellerInvitationLink = (resellerId: number) => {
  return (
    window.location.origin +
    "?reseller_invitation_id=" +
    (parseInt(process.env.REACT_APP_RESELLER_BASE_ID ?? "0") + resellerId)
  );
};

export async function copyToClipboard(textToCopy: string) {
  // Navigator clipboard api needs a secure context (https)
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(textToCopy);
    } else {
      // Use the 'out of viewport hidden text area' trick
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;

      // Move textarea out of the viewport so it's not visible
      textArea.style.position = "absolute";
      textArea.style.left = "-999999px";

      document.body.prepend(textArea);
      textArea.select();

      try {
        document.execCommand("copy");
      } catch (error) {
        console.error(error);
        toastError();
      } finally {
        textArea.remove();
      }
    }
    toastSuccess(
      (textToCopy.length > 15
        ? textToCopy.slice(0, 10) +
          "..." +
          textToCopy.slice(textToCopy.length - 10, textToCopy.length)
        : textToCopy) + " کپی شد"
    );
  } catch (e) {
    toastError();
  }
}

//function to check if a query string exist if yes return it else return false
export const getQueryStringValue = (key: string) => {
  return new URLSearchParams(window.location.search).get(key);
};

export function calculatePercentageDifference(num1: number, num2: number) {
  // Handle potential division by zero
  if (num2 === 0) {
    if (num1 > 0) {
      return 100;
    }
    return 0;
    // throw new Error("Cannot calculate percentage difference with a divisor of zero.");
  }

  // Calculate the absolute difference
  const difference = Math.abs(num1 - num2);

  // Determine the reference number for calculating percentage (avoid negative percentages for smaller differences)
  const reference = Math.max(num1, num2);

  // Calculate the percentage difference
  const percentageDifference = (difference / reference) * 100;

  // Determine direction (smaller or bigger)
  const direction = num1 > num2 ? "bigger" : "smaller";

  return percentageDifference.toFixed(2);
}
