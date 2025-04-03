import React, { Suspense } from "react";

import PageLoader from "@/components/loaders/pageLoader";
import RouterSwitch from "@/components/routerSwitch";

import { AuthorizationRoutes } from "./routes";

export default function AuthorizationResolver() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterSwitch routes={AuthorizationRoutes} />
    </Suspense>
  );
}
