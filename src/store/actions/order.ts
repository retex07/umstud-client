import { createAction } from "redux-actions";

import {
  AdGet,
  CompletedAd_BodyRequest,
  ExecutorBody,
  OptionSelect,
} from "@/api/handlers/order/types";

const prefix = "order/";

export const setResponder = createAction<
  ExecutorBody & { callback?: () => void }
>(prefix + "SET_RESPONDER");

export const getCategoriesAndTypes = createAction(
  prefix + "GET_CATEGORIES_AND_TYPES"
);
export const getMyOrders = createAction(prefix + "GET_MY_ORDERS");
export const getMyWorks = createAction(prefix + "GET_MY_WORKS");
export const getOrders = createAction(prefix + "GET_ORDERS");
export const getOrder = createAction<string>(prefix + "GET_ORDER");

export const setTypes = createAction<OptionSelect[]>(prefix + "SET_TYPES");
export const setCategories = createAction<OptionSelect[]>(
  prefix + "SET_CATEGORIES"
);

export const setOrders = createAction<AdGet[]>(prefix + "SET_ORDERS");
export const setOrderItem = createAction<AdGet>(prefix + "SET_ORDER_ITEM");
export const setMyOrdersList = createAction<AdGet[]>(
  prefix + "SET_MY_ORDER_LIST"
);
export const setMyWorksList = createAction<AdGet[]>(
  prefix + "SET_MY_WORKS_LIST"
);

export const setIsLoadingMyOrders = createAction<boolean>(
  prefix + "SET_IS_LOADING_MY_ORDERS"
);
export const setIsLoadingMyWorks = createAction<boolean>(
  prefix + "SET_IS_LOADING_MY_WORKS"
);
export const setIsLoadingOrders = createAction<boolean>(
  prefix + "SET_IS_LOADING_ORDERS"
);
export const setIsLoadingOrderItem = createAction<boolean>(
  prefix + "SET_IS_LOADING_ORDER_ITEM"
);

export const requestConfirmOrderReady = createAction<{
  chatRoomId?: string;
  callback?: () => void;
  orderId: string;
  data: CompletedAd_BodyRequest;
}>(prefix + "REQUEST_CONFIRM_ORDER_READY");
