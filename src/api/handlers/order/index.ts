import { ENDPOINTS_CONFIG } from "@/api/endpoints";
import http from "@/api/http";

import {
  ExecutorBody,
  AdGet,
  OptionSelect,
  CompletedAd_BodyRequest,
} from "./types";

interface QueryHandlers {
  getMyOrders: () => Promise<AdGet[]>;
  getMyWorks: () => Promise<AdGet[]>;
  getOrders: () => Promise<AdGet[]>;
  getOrder: (orderId: string) => Promise<AdGet>;
  getTypes: () => Promise<OptionSelect[]>;
  getCategories: () => Promise<OptionSelect[]>;
}

interface MutateHandlers {
  setExecutor: (data: ExecutorBody) => Promise<ExecutorBody>;
  completedOrder: (
    orderId: string,
    data: CompletedAd_BodyRequest
  ) => Promise<CompletedAd_BodyRequest>;
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

  const completedOrder: ApiOrderHandlers["completedOrder"] = async (
    orderId,
    data
  ) => {
    return (
      await http.post(API.ad.completed.replace(":orderId", orderId), data)
    ).data;
  };

  return {
    setExecutor,
    getMyOrders,
    getOrders,
    getTypes,
    getCategories,
    getOrder,
    getMyWorks,
    completedOrder,
  };
}
