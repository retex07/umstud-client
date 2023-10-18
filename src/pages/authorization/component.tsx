import PageLoader from "components/loaders/pageLoader";
import RouterSwitch from "components/routerSwitch";
import React, { Suspense } from "react";

import { AuthorizationRoutes } from "./routes";

export default function AuthorizationPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterSwitch routes={AuthorizationRoutes} />
    </Suspense>
  );
}
