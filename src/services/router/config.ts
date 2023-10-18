import { lazy } from "react";

import { Route } from "./types";

const IndexPageResolver = lazy(() => import("pages/index"));
const ServicesPageResolver = lazy(() => import("pages/services"));
const AuthorizationPageResolver = lazy(() => import("pages/authorization"));

const Routes: Route[] = [
  {
    path: "/",
    component: IndexPageResolver,
    settings: {
      exact: true,
    },
    layoutSettings: {},
  },
  {
    path: "/services",
    component: ServicesPageResolver,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: "/sign-in",
    component: AuthorizationPageResolver,
    settings: {
      exact: false,
    },
    layoutSettings: {
      withFooter: false,
      withHeader: false,
    },
  },
  {
    path: "/sign-up",
    component: AuthorizationPageResolver,
    settings: {
      exact: false,
    },
    layoutSettings: {
      withFooter: false,
      withHeader: false,
    },
  },
];

export default Routes;
