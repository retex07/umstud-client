import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { AdGet } from "@/api/handlers/order/types";
import Button from "@/components/button";
import CardTask from "@/components/cards/cardTask";
import PageLoader from "@/components/loaders/pageLoader";
import Modal from "@/components/modal";
import NoDataComponent from "@/components/noData";
import PanelOrderCreate from "@/components/panels/orderCreate";
import PanelOrderServices from "@/components/panels/popularServices";
import urls from "@/services/router/urls";
import { ReactComponent as PlusSvg } from "@/static/images/plus.svg";
import { ReactComponent as SettingsSvg } from "@/static/images/settings.svg";
import { getOrders } from "@/store/actions/order";
import { selectAccessToken } from "@/store/selectors/auth";
import { selectIsLoadingOrders, selectOrders } from "@/store/selectors/order";
import { selectUserData } from "@/store/selectors/user";
import { checkToken } from "@/utils/user";

import OrdersFilter, {
  OrdersFilters_FormData,
} from "./components/ordersFilter/OrdersFilter";
import "../styles.scss";

export default function IndexOrderPage() {
  const [isOpenModalFilters, setIsOpenModalFilters] = useState(false);
  const [orders, setOrders] = useState<AdGet[]>([]);

  const { t } = useTranslation("p_orders");
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const myProfileData = useSelector(selectUserData);
  const accessToken = useSelector(selectAccessToken);
  const dataOrders = useSelector(selectOrders);
  const isLoadingOrders = useSelector(selectIsLoadingOrders);

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

  return (
    <div id="page" className="page-container page-orders">
      <Modal
        title={t("pages.index.filters.title")}
        isOpen={isOpenModalFilters}
        onClose={changeOpenModalFilter}
      >
        <OrdersFilter callback={callbackFilters} />
      </Modal>
      <div className="page-orders__filters">
        <div className="page-orders__filters-container">
          <h4 className="page-orders__filters_head">
            {t("pages.index.filters.title")}
          </h4>
          <OrdersFilter callback={callbackFilters} />
        </div>
      </div>
      <div className="page-content-wrapper">
        <header className="page-orders__header">
          <h1 className="page-content-title">{t("title")}</h1>
          {myProfileData && accessToken && (
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
              {myProfileData && (
                <Button
                  label={t("actions.create-no-data")}
                  onClick={handleCreateOrder}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="page-orders__panels">
        <div className="page-orders__panels-container">
          <PanelOrderCreate />
          <PanelOrderServices />
        </div>
      </div>
    </div>
  );
}
