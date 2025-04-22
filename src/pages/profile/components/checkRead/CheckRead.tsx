import classNames from "classnames";
import React from "react";

import { ReactComponent as CheckSvg } from "@/static/images/check.svg";
import { ReactComponent as CheckDoubleSvg } from "@/static/images/checkDouble.svg";
import "./CheckRead.scss";

export default function CheckRead({ isRead }: { isRead?: boolean }) {
  return (
    <div className={classNames("check-read", { one: !isRead, double: isRead })}>
      {isRead ? <CheckDoubleSvg /> : <CheckSvg />}
    </div>
  );
}
