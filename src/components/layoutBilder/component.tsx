import Footer from "blocks/footer";
import React, { LazyExoticComponent, ReactElement, Suspense } from "react";

interface Props {
  component:
    | LazyExoticComponent<() => ReactElement>
    | (() => ReactElement)
    | null;
  renderFooter?: boolean;
}

LayoutBuilder.defaultProps = {
  renderFooter: true,
} as Partial<Props>;

export default function LayoutBuilder(props: Props) {
  if (props.component == null) return null;

  const { component: Component } = props;

  return (
    <Suspense fallback={<>Loading...</>}>
      <Component />
      <Footer />
    </Suspense>
  );
}
