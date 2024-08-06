import React from "react";
import { IPath } from "../types";
import createRoutes from "./baseRoutes";
import CommentsModal from "../CommentsModal";
import LandingPage from "../../pages/LandingPage";
import { getPostContent } from "../../Redux/dashboard/content/contentAction";
import { getCommentsModalAction } from "../../Redux/dashboard/comment/commentAction";
//
export default class Routes {
  static LandingPage: IPath = {
    path: "/",
    name: "LandingPage",
    middleware: [],
    preLoadingMethod: [{ action: getPostContent }],
  };
  static CommentsModal = (id?: number): IPath => {
    console.log('console.log', id);
    console.log('console.log');
    return {
      path: `posts/${id || ":id"}`,
      name: "commentsModal",
      middleware: [],
      preLoadingMethod: [
        { action: getCommentsModalAction, values: ['id'] }
      ],
    };
  };
}
//
export const indexRoutes = (): React.ReactElement[] =>
  createRoutes([
    {
      path: Routes.LandingPage,
      component: <LandingPage />,
    },
  ]);
  export const modalRoutes = (): React.ReactElement[] => createRoutes ([
    {
      path: Routes.CommentsModal(),
      component: <CommentsModal />,
    },
  ])
