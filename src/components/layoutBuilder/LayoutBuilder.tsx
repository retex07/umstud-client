import React, { LazyExoticComponent, ReactElement, Suspense } from "react";
import { Toaster } from "react-hot-toast";

import PageLoader from "@/components/loaders/pageLoader";

interface Props {
  component:
    | LazyExoticComponent<() => ReactElement>
    | (() => ReactElement)
    | null;
}

export default function LayoutBuilder(props: Props) {
  if (props.component == null) {
    return null;
  }

  const { component: Component } = props;

  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
      <Toaster
        containerClassName="toaster"
        position="top-right"
        reverseOrder={false}
      />
    </Suspense>
  );
}
