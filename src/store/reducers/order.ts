import { handleActions } from "redux-actions";

import {
  setCategories,
  setIsLoadingMyOrders,
  setIsLoadingOrderItem,
  setIsLoadingOrders,
  setMyOrdersList,
  setOrderItem,
  setOrders,
  setTypes,
} from "../actions/order";
import { StateOrder } from "../types/order";

export const initialState: StateOrder = {
  myOrders: {
    isLoading: false,
    list: [],
  },
  orders: [],
  isLoading: false,
  orderItem: {
    order: null,
    isLoading: false,
  },
  categories: [],
  types: [],
};

Object.freeze(initialState);

const order = handleActions<StateOrder, any>(
  {
    [setMyOrdersList.toString()]: (
      state,
      { payload }: ReturnType<typeof setMyOrdersList>
    ) => ({
      ...state,
      myOrders: {
        ...state.myOrders,
        list: payload,
      },
    }),
    [setOrders.toString()]: (
      state,
      { payload }: ReturnType<typeof setOrders>
    ) => ({
      ...state,
      orders: payload,
    }),
    [setIsLoadingMyOrders.toString()]: (
      state,
      { payload }: ReturnType<typeof setIsLoadingMyOrders>
    ) => ({
      ...state,
      myOrders: {
        ...state.myOrders,
        isLoading: payload,
      },
    }),
    [setIsLoadingOrderItem.toString()]: (
      state,
      { payload }: ReturnType<typeof setIsLoadingOrderItem>
    ) => ({
      ...state,
      orderItem: {
        ...state.orderItem,
        isLoading: payload,
      },
    }),
    [setIsLoadingOrders.toString()]: (
      state,
      { payload }: ReturnType<typeof setIsLoadingOrders>
    ) => ({
      ...state,
      isLoading: payload,
    }),
    [setOrderItem.toString()]: (
      state,
      { payload }: ReturnType<typeof setOrderItem>
    ) => ({
      ...state,
      orderItem: {
        ...state.orderItem,
        order: payload,
      },
    }),
    [setTypes.toString()]: (
      state,
      { payload }: ReturnType<typeof setTypes>
    ) => ({
      ...state,
      types: payload,
    }),
    [setCategories.toString()]: (
      state,
      { payload }: ReturnType<typeof setCategories>
    ) => ({
      ...state,
      categories: payload,
    }),
  },
  initialState
);

export default order;
