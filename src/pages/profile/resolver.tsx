import PageLoader from "components/loaders/pageLoader";
import RouterSwitch from "components/routerSwitch";
import React, { Suspense } from "react";

import { Routes } from "./routes";

export default function ProfileResolver() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterSwitch routes={Routes} />
    </Suspense>
  );
}
