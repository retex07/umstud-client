import CardTask from "components/cards/cardTask";
import { myWorkMock } from "mocks/profileMock";
import NavigationMenu from "pages/profile/components/navigationMenu";
import React from "react";
import { useTranslation } from "react-i18next";
import { isMobileVersion } from "utils/constant.utils";

import MobileNavigationMenu from "../../components/mobileNavigationMenu";
import "../../styles.scss";
import "./styles.scss";

export default function ProfileReadyTasksPage() {
  const { t } = useTranslation("p_profile", { keyPrefix: "readyTasks" });

  return (
    <div id="page" className="page-container">
      <div className="container-bar">
        <div className="profile-tabs">
          {isMobileVersion() && <MobileNavigationMenu />}
        </div>
        <div className="page-content-wrapper">
          <header className="page-content-title">{t("title")}</header>
          {myWorkMock.map((workCard) => (
            <CardTask key={workCard.id} {...workCard} />
          ))}
        </div>
        <NavigationMenu />
      </div>
    </div>
  );
}
