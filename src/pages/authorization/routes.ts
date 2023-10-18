import { lazy } from "react";
import { Route } from "services/router/types";

const SingInPageResolver = lazy(() => import("pages/authorization/_/signIn"));
const SingUpPageResolver = lazy(() => import("pages/authorization/_/signUp"));

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
];
