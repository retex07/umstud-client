import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";

import { ReactComponent as NoDataSvg } from "@/static/images/NoData.svg";
import "./NoData.scss";

interface Props {
  className?: string;
}

export default function NoDataComponent(props: Props) {
  const { className } = props;
  const { t } = useTranslation("c_noData");

  return (
    <div className={classNames(className, "no-data-component")}>
      <NoDataSvg />
      <div className="no-data-component__info">
        <h3 className="no-data-component__info_head">{t("head")}</h3>
        <p className="no-data-component__info_description">
          {t("description")}
        </p>
      </div>
    </div>
  );
}
