import store from "../../redux/store";
import { setRoute } from "../../redux/tools/routeSlice";
import { Route } from "react-router-dom";
import * as React from "react";
import { IPath, IRoute } from "../types";
import RNames from "./routes";
import CheckPreloadings from "./preloading.";

export let undefinedPath: string = "/";

function getRouteByName(
  name: string
): IPath | undefined {
  for (const [key, value] of Object.entries(
    RNames
  )) {
    if (value.name === name) {
      return value as IPath;
    }
  }
  return undefined;
}

//get full path by parent and child
const getFullPath = (
  parent: string,
  child: string
) => {
  const parentPath = parent.endsWith("/")
    ? parent
    : parent + "/";
  const childPath = child.startsWith("/")
    ? child.substring(1)
    : child;
  return parentPath + childPath;
};

function updateRouteNamePath(
  pathName: string,
  path: string
) {
  const routeName: IPath | undefined =
    getRouteByName(pathName);
  if (routeName && !routeName.registered) {
    routeName.path = path;
    routeName.registered = true;
  }
}

function pushElementToTotalRoutes({
  totalRoutes,
  route,
  path,
}: {
  totalRoutes: React.ReactElement[];
  route: IRoute;
  path: string;
}) {
  if (
    route.path.middleware ||
    route.path.preLoadingMethod
  ) {
    totalRoutes.push(
      <Route
        key={route.path.path}
        path={path}
        element={React.createElement(
          CheckPreloadings,
          {
            children:
              route.path.middleware?.length ===
                0 || !route.path.middleware
                ? route.component
                : route.path.middleware.reduce(
                    (prev, curr) => {
                      return React.createElement(
                        curr,
                        { children: prev }
                      );
                    },
                    route.component
                  ),
            path: route.path,
          }
        )}
      />
    );
  } else {
    totalRoutes.push(
      <Route
        key={route.path.path}
        path={path}
        element={route.component}
      />
    );
  }
}

function getChildRoute(
  parentPath: string,
  child: IRoute
): React.ReactElement[] {
  const totalRoutes: React.ReactElement[] = [];
  child.children?.forEach((child) => {
    const path = getFullPath(
      parentPath,
      child.path.path
    );
    pushElementToTotalRoutes({
      totalRoutes,
      route: child,
      path,
    });
    updateRouteNamePath(child.path.name, path);
    if (child.children) {
      totalRoutes.push(
        ...getChildRoute(path, child)
      );
    }
  });
  return totalRoutes;
}

const createRoutes = (
  routes: IRoute[]
): React.ReactElement[] => {
  //map on routes and its children
  const totalRoutes: React.ReactElement[] = [];
  //
  routes.forEach((route, i) => {
    pushElementToTotalRoutes({
      totalRoutes,
      route,
      path: route.path.path,
    });
    if (route.children) {
      route.children.forEach((child) => {
        const path = getFullPath(
          route.path.path,
          child.path.path
        );
        pushElementToTotalRoutes({
          totalRoutes,
          route: child,
          path,
        });
        updateRouteNamePath(
          child.path.name,
          path
        );
        if (child.children) {
          totalRoutes.push(
            ...getChildRoute(path, child)
          );
        }
      });
    }
  });
  console.log("totalRoutes", totalRoutes);
  return totalRoutes;
};

//go to route by name
export const goToRoute = (path: IPath) => {
  store.dispatch(setRoute(path.path));
};

export default createRoutes;
