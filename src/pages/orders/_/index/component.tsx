import { useAds } from "api/ads/queries/ads";
import Button from "components/button";
import CardTask from "components/cards/cardTask";
import NoDataComponent from "components/noData";
import React from "react";
import { useTranslation } from "react-i18next";
import "../../styles.scss";

export default function OrdersPage() {
  const { t } = useTranslation("p_orders");
  const { data: orders } = useAds();

  return (
    <div id="page" className="page-container">
      <div className="page-content-wrapper">
        <header className="page-content-title">{t("title")}</header>
        <div className="page-orders__list">
          {orders?.map(
            (order) =>
              order &&
              order.author && (
                <CardTask
                  isOrder
                  key={order.id}
                  user={order.author}
                  {...order}
                />
              )
          )}
          {!orders?.length && (
            <div className="page-orders__no-data">
              <NoDataComponent className="page-orders__no-data_logo" />
              <Button label={t("actions.create-no-data")} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
