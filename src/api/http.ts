import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { codeTokenNoValid } from "@/constants/config";
import { NotificationError } from "@/utils/error";

export const RequestConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const http = axios.create(RequestConfig);

http.interceptors.request.use(onFulfilledRequest, onRejectedRequest);
http.interceptors.response.use(onFulfilledResponse, onRejectedResponse);

export default http;

export const CancelToken = axios.CancelToken;

/**
 * Request interceptors
 */

export function onFulfilledRequest(config: AxiosRequestConfig) {
  const accessToken = localStorage.getItem("accessToken");

  if (config.headers != null) {
    if (accessToken != null) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }

  return config;
}

export function onRejectedRequest(error: unknown) {
  return Promise.reject(error);
}

/**
 * Response interceptors
 */

export function onFulfilledResponse(response: AxiosResponse) {
  return response;
}

export function onRejectedResponse(error: AxiosError) {
  if (error.response?.data.code === codeTokenNoValid) {
    localStorage.clear();
  }

  switch (true) {
    case !error.response:
      NotificationError(502);
      break;
    default:
      if (error.response?.data.code !== 401) {
        NotificationError(
          error.response?.status || 0,
          error.response?.data.detail || null
        );
      }
      break;
  }
  return Promise.reject(error);
}
