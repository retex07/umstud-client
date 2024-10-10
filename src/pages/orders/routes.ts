import { lazy } from "react";
import { Route } from "services/router/types";

const IndexPage = lazy(() => import("./_/index"));
const OrderItemPage = lazy(() => import("./_/orderItem"));

export const Routes: Route[] = [
  {
    path: "/",
    component: IndexPage,
    settings: {
      exact: true,
    },
    layoutSettings: {},
  },
  {
    path: "/:orderId",
    component: OrderItemPage,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
];
