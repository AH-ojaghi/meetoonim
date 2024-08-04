import API from "../services/api";
import { AxiosResponse } from "axios";
import { MediaType } from "../models/media";
import { convertObjectOfCamelCaseToObjectOfKeyBySnakeCase } from "../utils/funcions";
import {
  ProductCreateCredentials,
  ProductUpdateCredentials,
} from "../redux/dashboard/products/productsAction";

class ProductRequests {
  public static async getAllProducts(): Promise<AxiosResponse> {
    // const userType = checkUser();
    return await API.authGet("products", {
      isUseLoading: true,
    });
  }

  public static async getProductById(
    id: number
  ): Promise<AxiosResponse> {
    return await API.get("products/" + id, {
      isUseLoading: true,
    });
  }

  static async create(
    credentials: ProductCreateCredentials,
    onUploadProgress?: (
      progressEvent: number
    ) => void
  ): Promise<AxiosResponse> {
    return await API.authPost("products", {
      data: convertObjectOfCamelCaseToObjectOfKeyBySnakeCase(
        credentials
      ),
      isUseLoading: true,
      onProgress: onUploadProgress,
    });
  }

  static async remove(
    id: number
  ): Promise<AxiosResponse> {
    return await API.authDelete(
      `products/${id}`,
      { isUseLoading: true }
    );
  }

  static async update(
    credentials: ProductUpdateCredentials
  ): Promise<AxiosResponse> {
    return await API.authPut(
      `products/${credentials.id}`,
      {
        data: convertObjectOfCamelCaseToObjectOfKeyBySnakeCase(
          credentials,
          ["id"]
        ),
        isUseLoading: true,
      }
    );
  }
}

export default ProductRequests;
