import React from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as NoDataSvg } from "static/images/NoData.svg";
import "./styles.scss";

export default function NoDataComponent() {
  const { t } = useTranslation("c_noData");

  return (
    <div className="no-data-component">
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
