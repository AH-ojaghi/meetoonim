import { IPath } from "../types";
import * as React from "react";
import { getAll as getAllProducts } from "../../redux/dashboard/products/productsAction";
import { getProductById } from "../../redux/dashboard/productPage/productPageAction";
import Products from "../../pages/front/products";
import ProductPageModal from "../../pages/front/productPage";
// import guest from "../../middlewares/guest";
import createRoutes from "./baseRoutes";

export default class Routes {
  static home: IPath = {
    path: "/",
    name: "home",
    middleware: [
      /*guest*/
    ],
    preLoadingMethod: [{ action: getAllProducts }],
  };
  static products: IPath = {
    path: "/products",
    name: "products",
    middleware: [
      /*guest*/
    ],
    preLoadingMethod: [{ action: getAllProducts }],
  };
  static productPage = (id?: number): IPath => {
    return {
      path: `${this.products.path}/${id || ":id"}`,
      name: "productPage",
      middleware: [],
      preLoadingMethod: [{ action: getProductById, values: ["id"] }],
    };
  };
}
export const indexRoutes = (): React.ReactElement[] =>
  createRoutes([
    {
      path: Routes.products,
      component: <Products />,
    },
    {
      path: Routes.home,
      component: <Products />,
    },
    {
      path: Routes.productPage(),
      component: <ProductPageModal />,
      children: [],
    },
  ]);
