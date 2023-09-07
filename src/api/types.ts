import { AxiosResponse } from "axios";

export type PureResponse<T = unknown> = Promise<AxiosResponse<T>>;

export type UnprocessableEntityError = {
  loc: string[];
  msg: string;
  type: string;
};
