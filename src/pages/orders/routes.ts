import { lazy } from "react";
import { Route } from "services/router/types";
import urls from "services/router/urls";

const IndexPage = lazy(() => import("./_/index"));
const OrderItemPage = lazy(() => import("./_/item"));
const OrderCreatePage = lazy(() => import("./_/create"));

export const Routes: Route[] = [
  {
    path: urls.index,
    component: IndexPage,
    settings: {
      exact: true,
    },
    layoutSettings: {},
  },
  {
    path: urls.orders.item,
    component: OrderItemPage,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: urls.orders.create,
    component: OrderCreatePage,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: urls.orders.edit,
    component: OrderCreatePage,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
];
