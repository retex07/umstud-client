import { useAds } from "api/ads/queries/ads";
import { AdGet } from "api/ads/types";
import Button from "components/button";
import CardTask from "components/cards/cardTask";
import PageLoader from "components/loaders/pageLoader";
import Modal from "components/modal";
import NoDataComponent from "components/noData";
import { services } from "mocks/servicesMock";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import urls from "services/router/urls";
import { ReactComponent as FileSvg } from "static/images/file.svg";
import { ReactComponent as PlusSvg } from "static/images/plus.svg";
import { ReactComponent as SettingsSvg } from "static/images/settings.svg";
import { user as userSelector } from "store/user/user.selectors";
import { checkToken } from "utils/user.utils";

import {
  OrdersFilters,
  OrdersFilters_FormData,
} from "./components/ordersFilters";
import "../../styles.scss";

export default function OrdersPage() {
  const [isOpenModalFilters, setIsOpenModalFilters] = useState(false);
  const [orders, setOrders] = useState<AdGet[]>([]);

  const { t } = useTranslation("p_orders");
  const { data: dataOrders, isLoading: isLoadingOrders } = useAds();
  const history = useHistory();

  const { accessToken, user } = useSelector(userSelector);

  useEffect(() => {
    if (dataOrders) {
      setOrders(dataOrders);
    }
  }, [dataOrders]);

  function handleCreateOrder() {
    if (!accessToken) {
      checkToken(accessToken || "", history);
    } else {
      history.push(urls.orders.index + urls.orders.create);
    }
  }

  function callbackFilters(data: OrdersFilters_FormData) {
    setIsOpenModalFilters(false);

    if (!dataOrders) {
      return;
    }

    const dataWords = data.words;
    const dataTypes = data.type?.map((type) => type.label);
    const dataCategories = data.category?.map((category) => category.label);

    setOrders(
      dataOrders.filter((order) => {
        let wordsMatch = true;
        let typeMatch = true;
        let categoryMatch = true;

        if (dataWords && dataWords.trim() !== "") {
          wordsMatch = order.title.includes(dataWords);
        }

        if (dataTypes && dataTypes.length > 0) {
          typeMatch = dataTypes.some((dataType) =>
            order.type.includes(dataType)
          );
        }

        if (dataCategories && dataCategories.length > 0) {
          categoryMatch = dataCategories.some((dataCategory) =>
            order.category.includes(dataCategory)
          );
        }

        return wordsMatch && typeMatch && categoryMatch;
      })
    );
  }

  function changeOpenModalFilter() {
    setIsOpenModalFilters(!isOpenModalFilters);
  }

  function goToCreateOrder() {
    history.push(urls.orders.index + urls.orders.create);
  }

  function goToServices() {
    history.push(urls.services);
  }

  return (
    <div id="page" className="page-container page-orders">
      <Modal
        title={t("pages.index.filters.title")}
        isOpen={isOpenModalFilters}
        onClose={changeOpenModalFilter}
      >
        <OrdersFilters callback={callbackFilters} />
      </Modal>
      <div className="page-orders__filters">
        <div className="page-orders__filters-container">
          <h4 className="page-orders__filters_head">
            {t("pages.index.filters.title")}
          </h4>
          <OrdersFilters callback={callbackFilters} />
        </div>
      </div>
      <div className="page-content-wrapper">
        <header className="page-orders__header">
          <h1 className="page-content-title">{t("title")}</h1>
          {user && accessToken && (
            <div className="page-orders__header_btn-list">
              <Button
                classNames="page-orders__header_btn"
                size="very-small"
                color="green"
                onClick={goToCreateOrder}
              >
                <PlusSvg />
              </Button>
              <Button
                classNames="page-orders__header_btn page-orders__filters_btn"
                size="very-small"
                onClick={changeOpenModalFilter}
              >
                <SettingsSvg />
              </Button>
            </div>
          )}
        </header>
        <div className="page-orders__list">
          {orders?.map(
            (order) =>
              order &&
              order.status !== "closed" &&
              order.author && (
                <CardTask
                  isOrder
                  key={order.id}
                  user={order.author}
                  {...order}
                />
              )
          )}
          {isLoadingOrders && <PageLoader />}
          {!isLoadingOrders && !orders?.length && (
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
      <div className="page-orders__panels">
        <div className="page-orders__panels-container">
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
              fullWidth
              onClick={goToCreateOrder}
            />
          </div>
          <div className="page-orders__panel">
            <h4 className="page-orders__panel_head">
              {t("pages.index.panels.services.title")}
            </h4>
            <p className="page-orders__panel_descr">
              {t("pages.index.panels.services.description")}
            </p>
            <div>
              {services.map(
                (service, index) =>
                  index < 4 && (
                    <div className="page-orders__service" key={service.id}>
                      <FileSvg />
                      <div className="page-orders__service-info">
                        <h4 className="page-orders__service_head">
                          {service.name}
                        </h4>
                        <p className="page-orders__service_descr">
                          {service.price}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </div>
            <Button
              classNames="page-orders__panel_btn"
              label={t("pages.index.panels.services.action")}
              color="blue-dark"
              fullWidth
              onClick={goToServices}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
