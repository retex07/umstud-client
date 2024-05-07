import { AxiosResponse } from "axios";

export type PureResponse<T = unknown> = Promise<AxiosResponse<T>>;
