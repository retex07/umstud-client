import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import CardTask from "@/components/cards/cardTask";
import PageLoader from "@/components/loaders/pageLoader";
import NoDataComponent from "@/components/noData";
import NavigationMenu from "@/pages/profile/components/navigationMenu";
import { getMyOrders } from "@/store/actions/order";
import {
  selectIsLoadingMyOrders,
  selectMyOrdersList,
} from "@/store/selectors/order";
import { isMobileVersion } from "@/utils/util";

import MobileNavigationMenu from "../../components/mobileNavigationMenu";
import "./MyOrdersProfilePage.scss";
import "../styles.scss";

export default function MyOrdersProfilePage() {
  const { t } = useTranslation("p_profile", { keyPrefix: "orders" });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyOrders());
  }, []);

  const myOrdersList = useSelector(selectMyOrdersList);
  const isLoadingMyOrders = useSelector(selectIsLoadingMyOrders);

  return (
    <div id="page" className="page-container">
      <div className="container-bar">
        <div className="profile-tabs">
          {isMobileVersion() && <MobileNavigationMenu />}
        </div>
        <div className="page-content-wrapper">
          <header className="page-content-title">{t("title")}</header>
          {isLoadingMyOrders && <PageLoader />}
          {!isLoadingMyOrders && !myOrdersList?.length && <NoDataComponent />}
          {myOrdersList?.map((workCard) => (
            <CardTask
              {...workCard}
              key={workCard.id}
              user={workCard.executor}
            />
          ))}
        </div>
        <NavigationMenu />
      </div>
    </div>
  );
}
