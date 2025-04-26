import { lazy } from "react";

import { Route } from "./types";
import urls from "./urls";

const IndexPageResolver = lazy(() => import("@/pages/index"));
const RatingPageResolver = lazy(() => import("@/pages/rating"));
const ForumPageResolver = lazy(() => import("@/pages/forum/resolver"));
const OrdersPageResolver = lazy(() => import("@/pages/orders/resolver"));
const ContactsPageResolver = lazy(() => import("@/pages/contacts"));
const ServicesPageResolver = lazy(() => import("@/pages/services"));
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
    layoutSettings: {},
  },
  {
    path: urls.activate,
    component: ActivateAccountPageResolver,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: urls.profile.index,
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
    path: urls.services,
    component: ServicesPageResolver,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: urls.contacts,
    component: ContactsPageResolver,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: urls.rating.index,
    component: RatingPageResolver,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: urls.orders.index,
    component: OrdersPageResolver,
    settings: {
      exact: false,
    },
    layoutSettings: {
      withFooter: false,
      withHeader: false,
    },
  },
  {
    path: urls.forum.index,
    component: ForumPageResolver,
    settings: {
      exact: false,
    },
    layoutSettings: {
      withFooter: false,
      withHeader: false,
    },
  },
  {
    path: urls.auth.index,
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
