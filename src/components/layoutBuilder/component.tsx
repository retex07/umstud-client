import Footer from "blocks/footer";
import Header from "blocks/header";
import PageLoader from "components/loaders/pageLoader";
import React, { LazyExoticComponent, ReactElement, Suspense } from "react";

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
    </Suspense>
  );
}
