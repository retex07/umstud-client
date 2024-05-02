import { lazy } from "react";

import { Route } from "./types";

const IndexPageResolver = lazy(() => import("pages/index"));
const RatingPageResolver = lazy(() => import("pages/rating"));
const ForumPageResolver = lazy(() => import("pages/forum"));
const OrdersPageResolver = lazy(() => import("pages/orders"));
const ContactsPageResolver = lazy(() => import("pages/contacts"));
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
    path: "/contacts",
    component: ContactsPageResolver,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: "/rating",
    component: RatingPageResolver,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: "/orders",
    component: OrdersPageResolver,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: "/forum",
    component: ForumPageResolver,
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
