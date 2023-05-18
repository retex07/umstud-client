import { lazy } from "react";

import { Route } from "./types";

const IndexPageResolver = lazy(() => import("pages/index/component"));

const Routes: Route[] = [
  {
    path: "/",
    component: IndexPageResolver,
    settings: {
      exact: true,
    },
    layoutSettings: {},
  },
];

export default Routes;
