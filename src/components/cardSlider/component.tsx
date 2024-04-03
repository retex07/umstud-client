import React, { ReactNode } from "react";
import { ReactComponent as ChevronLeftSvg } from "static/images/chevron-left.svg";
import { ReactComponent as ChevronRightSvg } from "static/images/chevron-right.svg";
import "./styles.scss";

interface Props {
  children: ReactNode;
}

export default function CardSlider(props: Props) {
  return (
    <div className="card-slider">
      <div className="card-slider--action">
        <ChevronLeftSvg />
      </div>
      <div className="card-slider--items">{props.children}</div>
      <div className="card-slider--action">
        <ChevronRightSvg />
      </div>
    </div>
  );
}
