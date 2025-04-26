import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import Button from "@/components/button";
import urls from "@/services/router/urls";
import "../styles.scss";

export default function PanelOrderCreate() {
  const { t } = useTranslation("p_orders");
  const history = useHistory();

  function goToCreateOrder() {
    history.push(urls.orders.index + urls.orders.create);
  }

  return (
    <div className="info-panel">
      <h4 className="info-panel_head">
        {t("pages.index.panels.create.title")}
      </h4>
      <p className="info-panel_descr">
        {t("pages.index.panels.create.description")}
      </p>
      <Button
        classNames="info-panel_btn"
        label={t("actions.create-no-data")}
        fullWidth
        onClick={goToCreateOrder}
      />
    </div>
  );
}
