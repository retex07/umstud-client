import { AdGet, OptionSelect } from "@/api/handlers/order/types";

export interface StateOrder {
  myOrders: {
    isLoading: boolean;
    list: AdGet[];
  };
  orders: AdGet[];
  isLoading: boolean;
  orderItem: {
    order: AdGet | null;
    isLoading: boolean;
  };
  categories: OptionSelect[];
  types: OptionSelect[];
}
