import { lazy } from "react";

import { Route } from "@/services/router/types";
import urls from "@/services/router/urls";

const IndexPage = lazy(() => import("./_/index"));
const CreatePage = lazy(() => import("./_/create"));
const ItemPage = lazy(() => import("./_/item"));

export const Routes: Route[] = [
  {
    path: urls.index,
    component: IndexPage,
    settings: {
      exact: true,
    },
  },
  {
    path: urls.forum.create,
    component: CreatePage,
    settings: {
      exact: false,
    },
  },
  {
    path: urls.forum.item,
    component: ItemPage,
    settings: {
      exact: false,
    },
  },
];
