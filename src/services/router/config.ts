import { lazy } from "react";

import { Route } from "./types";

const IndexPageResolver = lazy(() => import("pages/index"));
const ServicesPageResolver = lazy(() => import("pages/services"));
const AuthorizationPageResolver = lazy(() => import("pages/authorization"));
const ProfilePageResolver = lazy(() => import("pages/profile/resolver"));
const ActivateAccountPageResolver = lazy(() => import("pages/activateAccount"));

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
    path: "/activate",
    component: ActivateAccountPageResolver,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: "/profile",
    component: ProfilePageResolver,
    settings: {
      exact: false,
    },
    layoutSettings: {
      withFooter: false,
      withHeader: false,
    },
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
    path: "/auth",
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
