import { useAdsItem } from "api/ads/queries/ad";
import PageLoader from "components/loaders/pageLoader";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import urls from "services/router/urls";
import "../../styles.scss";

export default function OrderItemPage() {
  const params = useParams<{ orderId: string }>();
  const { data: dataOrderItem, isLoading: isLoadingOrderItem } = useAdsItem(
    params.orderId
  );

  const history = useHistory();

  if (isLoadingOrderItem) {
    return <PageLoader />;
  }

  return (
    <div id="page" className="page-container">
      <div className="page-content-wrapper">
        <header className="page-orders__order_header">
          <div className="page-orders__order_header-info">
            <span
              className="page-orders__order_header-info_link"
              onClick={() => history.push(urls.orders.index)}
            >
              Заказы
            </span>
            <span className="page-orders__order_header-info_sub-title">
              {dataOrderItem?.title}
            </span>
          </div>
          <h2 className="page-content-title">{dataOrderItem?.title}</h2>
        </header>
        <div className="page-orders__list">order item</div>
      </div>
    </div>
  );
}
