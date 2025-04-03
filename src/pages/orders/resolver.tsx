import React, { Suspense } from "react";

import PageLoader from "@/components/loaders/pageLoader";
import RouterSwitch from "@/components/routerSwitch";

import { Routes } from "./routes";

export default function OrdersResolver() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterSwitch routes={Routes} />
    </Suspense>
  );
}
