import React from "react";
import { IPath } from "../types";
import createRoutes from "./baseRoutes";
import CommentsModal from "../CommentsModal";
import LandingPage from "../../pages/LandingPage";
//
export default class Routes {
  static LandingPage: IPath = {
    path: "/",
    name: "LandingPage",
    middleware: [],
    preLoadingMethod: [],
  };
  static CommentsModal = (id?: number): IPath => {
    console.log('ghfhgvg');
    
    return {
      path: `/posts/${id || ":id"}`,
      name: "CommentsModal",
      middleware: [],
      preLoadingMethod: [],
    };
    // path : '/post/:id'
  };
}
//
export const indexRoutes =
  (): React.ReactElement[] =>
    createRoutes([
      {
        path: Routes.LandingPage,
        component: <LandingPage />,
      },
      {
        path: Routes.CommentsModal(),
        component: <CommentsModal />,
      },
    ]);
