import { lazy } from "react";
import { Route } from "services/router/types";

const SingInPageResolver = lazy(() => import("pages/authorization/_/signIn"));
const SingUpPageResolver = lazy(() => import("pages/authorization/_/signUp"));
const RecoverPageResolver = lazy(() => import("pages/authorization/_/recover"));
const ResetPageResolver = lazy(() => import("pages/authorization/_/reset"));

export const AuthorizationRoutes: Route[] = [
  {
    path: "/sign-in",
    component: SingInPageResolver,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: "/sign-up",
    component: SingUpPageResolver,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: "/recover",
    component: RecoverPageResolver,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: "/reset",
    component: ResetPageResolver,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
];
