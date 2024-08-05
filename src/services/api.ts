import {
  API_BASE_URL,
  API_CONFIG,
} from "./connectionConfig";
import Auth from "./savedData/auth";
import toast from "react-hot-toast";
import { toastError } from "../utils/funcions";
import axios, { AxiosResponse } from "axios";

export type requestOptionsType = {
  data?: object;
  headers?: object;
  isUseLoading?: boolean;
  loadingMessage?: string;
  onProgress?: (uploadPercentage: number) => void;
};

class API {
  private readonly baseUrl: string;
  private readonly config: {
    headers: { [key: string]: any };
  };

  constructor(
    baseUrl: string,
    config: { headers: { [key: string]: any } }
  ) {
    this.baseUrl = baseUrl;
    this.config = config;
  }

  private async request(
    url: string,
    method: string,
    options?: requestOptionsType
  ): Promise<AxiosResponse> {
    let toastId: string | undefined = undefined;
    if (!options) options = {};
    if (options.isUseLoading) {
      toastId = toast.loading(
        options.loadingMessage
          ? options.loadingMessage
          : "در حال ارسال اطلاعات"
      );
    }
    try {
      //check if data has file or files
      if (options.data) {
        const data = options.data as any;
        const keys = Object.keys(data);
        const formData = new FormData();
        let hasFile = false;
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (data[key] instanceof File) {
            hasFile = true;
            formData.append(key, data[key]);
          } else if (Array.isArray(data[key])) {
            const array = data[key];
            for (
              let j = 0;
              j < array.length;
              j++
            ) {
              if (array[j] instanceof File) {
                hasFile = true;
                formData.append(
                  key + "[]",
                  array[j]
                );
              } else {
                formData.append(
                  key + "[]",
                  array[j]
                );
              }
            }
          } else {
            formData.append(key, data[key]);
          }
        }
        if (hasFile) {
          console.log("request has file");
          formData.append("_method", method);
          method = "POST";
          options.data = formData;
          options.headers = {
            ...options.headers,
            "Content-Type": "multipart/form-data",
          };
        }
      }

      const headers: object = options.headers
        ? {
            ...(this.config.headers as object),
            ...options.headers,
          }
        : (this.config as object);
      const response = await axios({
        url,
        method,
        data: options.data,
        headers: headers,
        onUploadProgress: (progressEvent) => {
          // Handle the upload progress here
          const progress =
            (progressEvent.loaded /
              (progressEvent.total ?? 0)) *
            100;
          options?.onProgress &&
            options.onProgress(
              progress /*.toFixed(2)*/
            );
        },
      });
      if (toastId) {
        toast.dismiss(toastId);
      }
      return response;
    } catch (e) {
      if (toastId) {
        toast.dismiss(toastId);
      }
      if (!axios.isAxiosError(e) || !e.response) {
        toastError(
          "خطایی در ارسال اطلاعات رخ داد"
        );
        throw e;
      }
      if (
        e.response.status !== 422 ||
        e.response.data >= 300 ||
        e.response.data < 200
      ) {
        toastError(
          e.response.data.message ??
            "خطایی در ارسال اطلاعات رخ داد"
        );
        throw e;
      }
      return e.response;
    } finally {
      if (toastId) {
        toast.dismiss(toastId);
      }
    }
  }

  public getUrlFromEndpoint(endpoint: string) {
    return `${this.baseUrl}/${endpoint}`;
  }

  public async authRequest(
    endpoint: string,
    method: string,
    options?: requestOptionsType
  ) {
    const token: string =
      options.token || options?.headers.token;
    if (!options) options = {};

    options.headers = options.headers
      ? {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        }
      : {
          token: token,
          Authorization: `Bearer ${token}`,
        };
    return this.request(
      this.getUrlFromEndpoint(endpoint),
      method,
      options
    );
  }

  public async post(
    endpoint: string,
    options?: requestOptionsType
  ) {
    return await this.request(
      this.getUrlFromEndpoint(endpoint),
      "POST",
      options
    );
  }

  public async authPost(
    endpoint: string,
    options?: requestOptionsType
  ) {
    return await this.authRequest(
      endpoint,
      "POST",
      options
    );
  }

  public async authGet(
    endpoint: string,
    options?: requestOptionsType
  ): Promise<AxiosResponse<any, any>> {


    if (!options) options = {};
    if (!options.loadingMessage)
      options.loadingMessage =
        "در حال دریافت اطلاعات";
    return await this.authRequest(
      endpoint,
      "GET",
      options
    );
  }

  public async authDelete(
    endpoint: string,
    options?: requestOptionsType
  ) {
    if (!options) options = {};
    options.loadingMessage = "در حال حذف اطلاعات";
    return await this.authRequest(
      endpoint,
      "DELETE",
      options
    );
  }

  public async get(
    endpoint: string,
    options?: requestOptionsType
  ) {
    if (!options) options = {};
    if (!options.loadingMessage)
      options.loadingMessage =
        "در حال دریافت اطلاعات";
    return await this.request(
      this.getUrlFromEndpoint(endpoint),
      "GET",
      options
    );
  }

  async authPut(
    endpoint: string,
    options?: requestOptionsType
  ) {
    if (!options) options = {};

    options.loadingMessage =
      "در حال ویرایش اطلاعات";

    return await this.authRequest(
      endpoint,
      "PUT",
      options.headers
    );
  }
}

const api = new API(API_BASE_URL, API_CONFIG);

export default api;
