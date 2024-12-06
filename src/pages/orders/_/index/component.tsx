import { useAds } from "api/ads/queries/ads";
import Button from "components/button";
import CardTask from "components/cards/cardTask";
import NoDataComponent from "components/noData";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import urls from "services/router/urls";
import { user } from "store/user/user.selectors";
import { checkToken } from "utils/user.utils";
import "../../styles.scss";

export default function OrdersPage() {
  const { t } = useTranslation("p_orders");
  const { data: orders } = useAds();
  const history = useHistory();

  const { accessToken } = useSelector(user);

  function handleCreateOrder() {
    if (!accessToken) {
      checkToken(accessToken || "", history);
    } else {
      history.push(urls.orders.index + urls.orders.create);
    }
  }

  function goToCreateOrder() {
    history.push(urls.orders.index + urls.orders.create);
  }

  return (
    <div id="page" className="page-container page-orders">
      <div className="page-content-wrapper">
        <header className="page-orders__header">
          <h1 className="page-content-title">{t("title")}</h1>
          <Button
            classNames="page-orders__header_btn"
            size="very-small"
            color="green"
            label="+"
            onClick={goToCreateOrder}
          />
        </header>
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
              <Button
                label={t("actions.create-no-data")}
                onClick={handleCreateOrder}
              />
            </div>
          )}
        </div>
      </div>
      <div className="page-orders__panel">
        <h4 className="page-orders__panel_head">
          {t("pages.index.panels.create.title")}
        </h4>
        <p className="page-orders__panel_descr">
          {t("pages.index.panels.create.description")}
        </p>
        <Button
          classNames="page-orders__panel_btn"
          label={t("actions.create-no-data")}
          onClick={goToCreateOrder}
        />
      </div>
    </div>
  );
}
