import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const RequestConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_BASE_URL_API,
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
  return Promise.reject(error);
}
