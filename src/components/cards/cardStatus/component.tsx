import React from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as CheckSvg } from "static/images/check.svg";
import { ReactComponent as ClockSvg } from "static/images/clock.svg";
import { ReactComponent as ExitSvg } from "static/images/exit.svg";
import "./styles.scss";

export type CardStatusTypes = "open" | "closed" | "in_progress";

interface Props {
  type: CardStatusTypes;
  textOpen?: string;
  textClose?: string;
}

export default function CardStatus(props: Props) {
  const { t } = useTranslation("c_cards", { keyPrefix: "cardStatus" });

  switch (props.type) {
    case "open":
      return (
        <div className="card-status open">
          <CheckSvg />
          {props.textOpen ?? t("open")}
        </div>
      );
    case "closed":
      return (
        <div className="card-status close">
          <ExitSvg />
          {props.textClose ?? t("closed")}
        </div>
      );
    case "in_progress":
      return (
        <div className="card-status progress">
          <ClockSvg />
          {props.textClose ?? t("inProgress")}
        </div>
      );
    default:
      return null;
  }
}
