import React from "react";
import { IPath } from "../types";
import createRoutes from "./baseRoutes";
import CommentsModal from "../CommentsModal";
import LandingPage from "../../pages/LandingPage";
import { getPostContent } from "../../Redux/dashboard/content/contentAction";
//
export default class Routes {
  static LandingPage: IPath = {
    path: "/",
    name: "LandingPage",
    middleware: [],
    preLoadingMethod: [{action: getPostContent}],
  };
  static CommentsModal = (id?: number): IPath => {
    
    return {
      path: `/posts/${id || ":id"}`,
      name: "CommentsModal",
      middleware: [],
      preLoadingMethod: [
        {
          action: getPostContent
        }
      ],
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
