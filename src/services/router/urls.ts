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
      item: "/messages/:messageId",
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
    item: "/item/:orderId",
  },
  forum: {
    index: "/forum",
  },
  auth: {
    index: "/auth",
    signIn: "/sign-in",
    signUp: "/sign-up",
    recover: "/recover",
    reset: "/reset",
  },
};

export default urls;
