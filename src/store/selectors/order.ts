import { get } from "lodash";
import { createSelector } from "reselect";

import { initialState } from "../reducers/order";
import { RootState } from "../types";

const prefix = "order";

export const selectOrder = (state: RootState) =>
  get(state, prefix) || { ...initialState };

export const selectIsLoadingMyOrders = createSelector(selectOrder, (state) =>
  get(state, "myOrders.isLoading")
);
export const selectIsLoadingOrderItem = createSelector(selectOrder, (state) =>
  get(state, "orderItem.isLoading")
);
export const selectIsLoadingOrders = createSelector(selectOrder, (state) =>
  get(state, "isLoading")
);

export const selectMyOrdersList = createSelector(selectOrder, (state) =>
  get(state, "myOrders.list")
);
export const selectOrders = createSelector(selectOrder, (state) =>
  get(state, "orders")
);
export const selectOrderItem = createSelector(selectOrder, (state) =>
  get(state, "orderItem.order")
);

export const selectCategories = createSelector(selectOrder, (state) =>
  get(state, "categories")
);
export const selectTypes = createSelector(selectOrder, (state) =>
  get(state, "types")
);
