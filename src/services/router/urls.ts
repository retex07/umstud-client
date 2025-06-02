const urls = {
  index: "/",
  activate: "/activate",
  profile: {
    index: "/profile",
    item: "/user/:profileId",
    security: "/security",
    edit: "/edit",
    readyTask: "/ready-tasks",
    blackList: "/black-list",
    myOrders: "/orders",
    myWork: "/works",
    messages: {
      index: "/messages",
      item: "/messages/:roomId",
    },
  },
  services: "/services",
  rating: {
    index: "/rating",
  },
  orders: {
    index: "/orders",
    create: "/create",
    edit: "/edit/:orderId",
    item: "/item/:orderId",
  },
  forum: {
    index: "/forum",
    create: "/create",
    edit: "/edit/:discussionId",
    item: "/item/:discussionId",
  },
  auth: {
    index: "/auth",
    signIn: "/sign-in",
    signUp: "/sign-up",
    recover: "/recover",
    reset: "/reset",
  },
  chat: {
    room: "/chat/:roomId/",
  },
  notification: "/notification/",
};

export const PRIVATE_URLS = [
  // orders
  urls.orders.index + urls.orders.create,
  urls.orders.index + urls.orders.item.replace(":orderId", ""),
  urls.orders.index + urls.orders.edit,

  // forum
  urls.forum.index + urls.forum.create,
  urls.forum.index + urls.forum.edit,

  // profile
  urls.profile.index,
  urls.profile.index + urls.profile.item.replace(":profileId", ""),
  urls.profile.index + urls.profile.security,
  urls.profile.index + urls.profile.edit,
  urls.profile.index + urls.profile.readyTask,
  urls.profile.index + urls.profile.blackList,
  urls.profile.index + urls.profile.myOrders,
  urls.profile.index + urls.profile.myWork,
  urls.profile.index + urls.profile.messages.index,
];

export default urls;
