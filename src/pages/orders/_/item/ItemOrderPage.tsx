import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import useRespondAd from "@/api/ads/mutations/respond";
import { useUserProfile } from "@/api/user/queries/userProfile";
import Button from "@/components/button";
import CardStatus from "@/components/cards/cardStatus";
import InfoUser from "@/components/infoUser";
import PageLoader from "@/components/loaders/pageLoader";
import PanelOrderServices from "@/components/panels/popularServices";
import urls from "@/services/router/urls";
import { ReactComponent as SvgEdit } from "@/static/images/edit.svg";
import { getOrder } from "@/store/actions/order";
import { selectAccessToken } from "@/store/selectors/auth";
import {
  selectIsLoadingOrderItem,
  selectOrderItem,
} from "@/store/selectors/order";
import { selectUserData } from "@/store/selectors/user";

import TableOrderInfo from "../../components/tableOrderInfo";

import "../styles.scss";

export default function ItemOrderPage() {
  const { t } = useTranslation("p_orders");

  const dispatch = useDispatch();
  const params = useParams<{ orderId: string }>();

  function fetchOrder() {
    dispatch(getOrder(params.orderId));
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  const user = useSelector(selectUserData);
  const accessToken = useSelector(selectAccessToken);
  const dataOrderItem = useSelector(selectOrderItem);
  const isLoadingOrderItem = useSelector(selectIsLoadingOrderItem);

  const { slug } = user || {};

  const { data: dataAuthor, isLoading: isLoadingAuthor } = useUserProfile(
    dataOrderItem?.author.slug,
    { enabled: !!dataOrderItem }
  );

  const onRespondAd = useRespondAd();
  const history = useHistory();

  if (isLoadingOrderItem || isLoadingAuthor) {
    return <PageLoader />;
  }

  const isMyOrder =
    dataAuthor && accessToken && user && slug && slug === dataAuthor.slug;

  const isRespond =
    !isMyOrder &&
    dataAuthor &&
    (dataOrderItem?.responders?.length || 0) > 0 &&
    !!dataOrderItem?.responders?.find(
      ({ responder }) => responder.slug === slug
    );

  function onRespond() {
    if (
      !!params.orderId &&
      Number(params.orderId) &&
      !isRespond &&
      !isMyOrder
    ) {
      onRespondAd.mutate(
        {
          data: {
            ad_id: Number(params.orderId),
            comment: t("pages.item.actions.respondedSuccess"),
          },
        },
        {
          onSuccess: () => {
            toast.success(t("pages.item.actions.respondedSuccess"), {
              duration: 5000,
            });
            fetchOrder();
          },
        }
      );
    }
  }

  function goToEditOrder() {
    if (isMyOrder && params.orderId) {
      history.push(
        urls.orders.index + urls.orders.edit.replace(":orderId", params.orderId)
      );
    }
  }

  return (
    <div id="page" className="page-container">
      <div className="page-wrapper">
        <PanelOrderServices />
        <div className="page-content-wrapper">
          <header className="page-orders__order_header">
            <div className="page-orders__order_header-block">
              <div className="page-orders__order_header-info">
                <span
                  className="page-orders__order_header-info_link"
                  onClick={() => history.push(urls.orders.index)}
                >
                  {t("title")}
                </span>
                <span className="page-orders__order_header-info_sub-title">
                  {dataOrderItem?.title}
                </span>
              </div>
              <h2 className="page-content-title">{dataOrderItem?.title}</h2>
            </div>
            {isMyOrder && (
              <div
                className="page-orders__order_header-action"
                onClick={goToEditOrder}
              >
                <SvgEdit />
              </div>
            )}
          </header>
          <div className="page-orders__order-info">
            {isMyOrder && (
              <Button
                onClick={goToEditOrder}
                classNames="page-orders__order_header-action_btn"
                fullWidth
                size="small"
                color="green"
                label={t("pages.item.actions.edit")}
              />
            )}
            {dataAuthor && (
              <InfoUser
                slug={dataAuthor.slug}
                first_name={dataAuthor.first_name}
                last_name={dataAuthor.last_name}
                photo={dataAuthor.photo || ""}
                username={dataAuthor.username}
                is_staff={dataAuthor.is_staff}
                is_superuser={dataAuthor.is_superuser}
              />
            )}
            {dataOrderItem?.status && (
              <CardStatus type={dataOrderItem.status} />
            )}
            {dataOrderItem && <TableOrderInfo {...dataOrderItem} />}
          </div>
          <section className="page-orders__order-info-section">
            <h3 className="page-orders__order-info-section_head">
              {t("pages.item.sections.description.title")}
            </h3>
            <p className="page-orders__order-info-section_descr">
              {dataOrderItem?.description
                ? dataOrderItem?.description
                : t("pages.item.sections.description.noText")}
            </p>
          </section>
          {!isMyOrder &&
            dataOrderItem?.status === "open" &&
            user &&
            accessToken && (
              <Button
                isLoading={isLoadingOrderItem}
                onClick={onRespond}
                disabled={isRespond || isLoadingOrderItem}
                label={
                  isLoadingOrderItem
                    ? t("pages.item.actions.loading")
                    : isRespond
                    ? t("pages.item.actions.responded")
                    : t("pages.item.actions.respond")
                }
                color="green"
              />
            )}
        </div>
      </div>
    </div>
  );
}
