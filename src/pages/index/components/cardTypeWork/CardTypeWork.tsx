import React from "react";
import { useTranslation } from "react-i18next";

import { ReactComponent as FileSvg } from "@/static/images/file.svg";
import "./CardTypeWork.scss";

interface Props {
  title: string;
  startPrice: number;
  startDeadline: number;
}

export default function CardTypeWork(props: Props) {
  const { t } = useTranslation("c_cards", { keyPrefix: "cardTypeWork" });

  return (
    <article className="card-type-work">
      <header className="card-type-work--header">
        <div className="card-type-work--icon-file">
          <FileSvg />
        </div>
        <h3 className="card-type-work--title">{props.title}</h3>
      </header>
      <footer className="card-type-work--footer">
        <div className="card-type-work--info-wrapper">
          <span className="card-type-work--subtitle">{t("cost")}</span>
          <p className="card-type-work--description">
            от {props.startPrice} руб.
          </p>
        </div>
        <div className="card-type-work--info-wrapper">
          <span className="card-type-work--subtitle">{t("duration")}</span>
          <p className="card-type-work--description">
            {t("startDeadline", { deadline: props.startDeadline })}
          </p>
        </div>
      </footer>
    </article>
  );
}
