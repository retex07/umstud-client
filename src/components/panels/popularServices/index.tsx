import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import Button from "@/components/button";
import { services } from "@/mocks/servicesMock";
import urls from "@/services/router/urls";
import { ReactComponent as FileSvg } from "@/static/images/file.svg";
import "../styles.scss";

export default function PanelOrderServices() {
  const { t } = useTranslation("p_orders");
  const history = useHistory();

  function goToServices() {
    history.push(urls.services);
  }

  function goToSearchOrders(name: string) {
    history.push(urls.orders.index + `?searchType=${name}`);
  }

  return (
    <div className="info-panel">
      <h4 className="info-panel_head">
        {t("pages.index.panels.services.title")}
      </h4>
      <p className="info-panel_descr">
        {t("pages.index.panels.services.description")}
      </p>
      <div>
        {services.map(
          (service, index) =>
            index < 4 && (
              <div
                className="info-panel__service"
                key={service.id}
                onClick={() => goToSearchOrders(service.name)}
              >
                <FileSvg />
                <div className="info-panel__service-info">
                  <h4 className="info-panel__service_head">{service.name}</h4>
                  <p className="info-panel__service_descr">{service.price}</p>
                </div>
              </div>
            )
        )}
      </div>
      <Button
        classNames="info-panel_btn"
        label={t("pages.index.panels.services.action")}
        color="blue-dark"
        fullWidth
        onClick={goToServices}
      />
    </div>
  );
}
