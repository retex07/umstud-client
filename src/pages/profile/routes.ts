import { lazy } from "react";
import { Route } from "services/router/types";

const EditPage = lazy(() => import("./_/edit"));
const IndexPage = lazy(() => import("./_/index"));
const ProfileUserPage = lazy(() => import("./_/index/{id}"));
const BlackListPage = lazy(() => import("./_/blackList"));
const MessagesPage = lazy(() => import("./_/messages"));
const ReadyTasksPage = lazy(() => import("./_/readyTasks"));
const MyOrdersPage = lazy(() => import("./_/myOrders"));
const MyWorksPage = lazy(() => import("./_/myWorks"));

export const baseUrl = "/profile";
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
    path: "/user/:profileId",
    component: ProfileUserPage,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: "/messages",
    component: MessagesPage,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: "/edit",
    component: EditPage,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: "/ready-tasks",
    component: ReadyTasksPage,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: "/black-list",
    component: BlackListPage,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: "/orders",
    component: MyOrdersPage,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
  {
    path: "/works",
    component: MyWorksPage,
    settings: {
      exact: false,
    },
    layoutSettings: {},
  },
];
