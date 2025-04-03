import { lazy } from "react";

import { Route } from "@/services/router/types";
import urls from "@/services/router/urls";

const EditPage = lazy(() => import("./_/edit"));
const IndexPage = lazy(() => import("./_/index"));
const SecurityPage = lazy(() => import("./_/security"));
const BlackListPage = lazy(() => import("./_/blackList"));
const MessagesPage = lazy(() => import("./_/messages"));
const ChatRoomPage = lazy(() => import("./_/messages/_/room"));
const MyOrdersPage = lazy(() => import("./_/myOrders"));
const MyWorksPage = lazy(() => import("./_/myWorks"));

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
    path: urls.profile.item,
    component: IndexPage,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: urls.profile.security,
    component: SecurityPage,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: urls.profile.messages.index,
    component: MessagesPage,
    settings: {
      exact: true,
    },
    layoutSettings: {},
  },
  {
    path: urls.profile.messages.item,
    component: ChatRoomPage,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: urls.profile.edit,
    component: EditPage,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: urls.profile.blackList,
    component: BlackListPage,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: urls.profile.myOrders,
    component: MyOrdersPage,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: urls.profile.myWork,
    component: MyWorksPage,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
];
