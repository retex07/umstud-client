import { lazy } from "react";

import { Route } from "@/services/router/types";
import urls from "@/services/router/urls";

const SingInPageResolver = lazy(() => import("@/pages/authorization/_/signIn"));
const SingUpPageResolver = lazy(() => import("@/pages/authorization/_/signUp"));
const RecoverPageResolver = lazy(
  () => import("@/pages/authorization/_/recover")
);
const ResetPageResolver = lazy(() => import("@/pages/authorization/_/reset"));

export const AuthorizationRoutes: Route[] = [
  {
    path: urls.auth.signIn,
    component: SingInPageResolver,
    settings: {
      exact: false,
    },
  },
  {
    path: urls.auth.signUp,
    component: SingUpPageResolver,
    settings: {
      exact: false,
    },
  },
  {
    path: urls.auth.recover,
    component: RecoverPageResolver,
    settings: {
      exact: false,
    },
  },
  {
    path: urls.auth.reset,
    component: ResetPageResolver,
    settings: {
      exact: false,
    },
  },
];
