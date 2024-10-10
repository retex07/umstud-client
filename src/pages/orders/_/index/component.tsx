import CardTask from "components/cards/cardTask";
import { orders } from "mocks/orderMock";
import React from "react";
import { useTranslation } from "react-i18next";
import "../../styles.scss";

export default function OrdersPage() {
  const { t } = useTranslation("p_orders");

  return (
    <div id="page" className="page-container">
      <div className="page-content-wrapper">
        <header className="page-content-title">{t("title")}</header>
        <div className="page-orders__list">
          {orders.map((order) => (
            <CardTask isOrder key={order.id} user={order.author} {...order} />
          ))}
        </div>
      </div>
    </div>
  );
}
