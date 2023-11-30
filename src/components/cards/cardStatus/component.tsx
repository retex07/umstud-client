import React from "react";
import { ReactComponent as CheckSvg } from "static/images/check.svg";
import { ReactComponent as ExitSvg } from "static/images/exit.svg";
import "./styles.scss";

export type CardStatusTypes = "open" | "closed";

interface Props {
  type: CardStatusTypes;
  textOpen?: string;
  textClose?: string;
}

export default function CardStatus(props: Props) {
  return (
    <>
      {props.type == "open" ? (
        <div className="card-status open">
          <CheckSvg />
          {props.textOpen ?? "Открыто"}
        </div>
      ) : (
        <div className="card-status close">
          <ExitSvg />
          {props.textClose ?? "Закрыто"}
        </div>
      )}
    </>
  );
}
