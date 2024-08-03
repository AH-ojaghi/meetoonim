import LandingPage from "../pages/LandingPage";
import { RouteObject } from "react-router-dom";
import CommentsModal from "./CommentsModal";

const routes: RouteObject[] = [
  { path: "/", element: <LandingPage /> },
  { path: "/posts/:id", element: <CommentsModal /> },
];

export default routes;
