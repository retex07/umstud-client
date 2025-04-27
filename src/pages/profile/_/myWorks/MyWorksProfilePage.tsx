import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import CardTask from "@/components/cards/cardTask";
import PageLoader from "@/components/loaders/pageLoader";
import NoDataComponent from "@/components/noData";
import NavigationMenu from "@/pages/profile/components/navigationMenu";
import { getMyWorks } from "@/store/actions/order";
import {
  selectIsLoadingMyWorks,
  selectMyWorksList,
} from "@/store/selectors/order";
import { isMobileVersion } from "@/utils/util";

import MobileNavigationMenu from "../../components/mobileNavigationMenu";
import "./MyWorksProfilePage.scss";
import "../styles.scss";

export default function MyWorksProfilePage() {
  const { t } = useTranslation("p_profile", { keyPrefix: "works" });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyWorks());
  }, []);

  const myWorksList = useSelector(selectMyWorksList);
  const isLoadingMyWorks = useSelector(selectIsLoadingMyWorks);

  return (
    <div id="page" className="page-container">
      <div className="container-bar">
        <div className="profile-tabs">
          {isMobileVersion() && <MobileNavigationMenu />}
        </div>
        <div className="page-content-wrapper">
          <header className="page-content-title">{t("title")}</header>
          {isLoadingMyWorks && !myWorksList && <PageLoader />}
          {!isLoadingMyWorks && !myWorksList.length && <NoDataComponent />}
          {myWorksList.length > 0 && (
            <div className="order-card__list">
              {myWorksList.map((workCard) => (
                <CardTask
                  {...workCard}
                  key={workCard.id}
                  user={workCard.executor}
                  className="order-card__item_my-order"
                />
              ))}
            </div>
          )}
        </div>
        <NavigationMenu />
      </div>
    </div>
  );
}
