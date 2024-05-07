import Footer from "blocks/footer";
import Header from "blocks/header";
import PageLoader from "components/loaders/pageLoader";
import React, { LazyExoticComponent, ReactElement, Suspense } from "react";
import { Toaster } from "react-hot-toast";

interface Props {
  component:
    | LazyExoticComponent<() => ReactElement>
    | (() => ReactElement)
    | null;
  renderFooter?: boolean;
  renderHeader?: boolean;
}

LayoutBuilder.defaultProps = {
  renderFooter: true,
  renderHeader: true,
} as Partial<Props>;

export default function LayoutBuilder(props: Props) {
  if (props.component == null) return null;

  const { component: Component } = props;

  return (
    <Suspense fallback={<PageLoader />}>
      {props.renderHeader && <Header />}
      <Component />
      {props.renderFooter && <Footer />}
      <Toaster
        containerClassName="toaster"
        position="top-right"
        reverseOrder={false}
      />
    </Suspense>
  );
}
