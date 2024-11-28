import { orderItem } from "mocks/orderMock";
import React from "react";
import { useHistory } from "react-router-dom";
import urls from "services/router/urls";
import "../../styles.scss";

export default function OrderItemPage() {
  const order = orderItem;
  const history = useHistory();

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
              {order.title}
            </span>
          </div>
          <h2 className="page-content-title">{order.title}</h2>
        </header>
        <div className="page-orders__list">order item</div>
      </div>
    </div>
  );
}
