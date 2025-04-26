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
  contacts: "/contacts",
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

export default urls;
