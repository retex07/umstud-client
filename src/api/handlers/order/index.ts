import { ENDPOINTS_CONFIG } from "@/api/endpoints";
import http from "@/api/http";
import { PureResponse } from "@/api/types";

import { ExecutorBody, AdGet, OptionSelect } from "./types";

interface QueryHandlers {
  getMyOrders: () => PureResponse<AdGet[]>;
  getMyWorks: () => PureResponse<AdGet[]>;
  getOrders: () => PureResponse<AdGet[]>;
  getOrder: (orderId: string) => PureResponse<AdGet>;
  getTypes: () => PureResponse<OptionSelect[]>;
  getCategories: () => PureResponse<OptionSelect[]>;
}

interface MutateHandlers {
  setExecutor: (data: ExecutorBody) => PureResponse<ExecutorBody>;
}

export type ApiOrderHandlers = MutateHandlers & QueryHandlers;

const API = ENDPOINTS_CONFIG.api;

export default function ApiOrder(): ApiOrderHandlers {
  const setExecutor = async (data: ExecutorBody) => {
    return (await http.post(API.ad.executor, data)).data;
  };

  const getMyOrders = async () => {
    return (await http.get(API.ad.myOrders)).data;
  };

  const getMyWorks = async () => {
    return (await http.get(API.ad.myWorks)).data;
  };

  const getOrders = async () => {
    return (await http.get(API.ad.ads)).data;
  };

  const getOrder = async (orderId: string) => {
    return (await http.get(API.ad.ad + orderId + "/")).data;
  };

  const getTypes = async () => {
    return (await http.get(API.ad.types)).data;
  };

  const getCategories = async () => {
    return (await http.get(API.ad.categories)).data;
  };

  return {
    setExecutor,
    getMyOrders,
    getOrders,
    getTypes,
    getCategories,
    getOrder,
    getMyWorks,
  };
}
