import { LazyExoticComponent, ReactElement } from "react";
import { RouteProps } from "react-router-dom";

export interface Route {
  path: NonNullable<RouteProps["path"]>;
  component:
    | LazyExoticComponent<() => ReactElement>
    | (() => ReactElement)
    | null;
  settings: Pick<RouteProps, "exact" | "strict" | "sensitive">;
  layoutSettings: {
    withFooter?: boolean;
    withHeader?: boolean;
  };
}
