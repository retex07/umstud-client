import { lazy } from "react";

import { Route } from "./types";
import urls from "./urls";

const IndexPageResolver = lazy(() => import("@/pages/index"));
const RatingPageResolver = lazy(() => import("@/pages/rating"));
const ForumPageResolver = lazy(() => import("@/pages/forum/resolver"));
const OrdersPageResolver = lazy(() => import("@/pages/orders/resolver"));
const ServicesPageResolver = lazy(() => import("@/pages/services"));
const PrivacyPageResolver = lazy(() => import("@/pages/privacy"));
const AuthorizationPageResolver = lazy(
  () => import("@/pages/authorization/resolver")
);
const ProfilePageResolver = lazy(() => import("@/pages/profile/resolver"));
const ActivateAccountPageResolver = lazy(
  () => import("@/pages/activateAccount")
);

const Routes: Route[] = [
  {
    path: urls.index,
    component: IndexPageResolver,
    settings: {
      exact: true,
    },
  },
  {
    path: urls.activate,
    component: ActivateAccountPageResolver,
    settings: {
      exact: false,
    },
  },
  {
    path: urls.profile.index,
    component: ProfilePageResolver,
    settings: {
      exact: false,
    },
  },
  {
    path: urls.services,
    component: ServicesPageResolver,
    settings: {
      exact: false,
    },
  },
  {
    path: urls.rating.index,
    component: RatingPageResolver,
    settings: {
      exact: false,
    },
  },
  {
    path: urls.privacy,
    component: PrivacyPageResolver,
    settings: {
      exact: false,
    },
  },
  {
    path: urls.orders.index,
    component: OrdersPageResolver,
    settings: {
      exact: false,
    },
  },
  {
    path: urls.forum.index,
    component: ForumPageResolver,
    settings: {
      exact: false,
    },
  },
  {
    path: urls.auth.index,
    component: AuthorizationPageResolver,
    settings: {
      exact: false,
    },
  },
];

export default Routes;
