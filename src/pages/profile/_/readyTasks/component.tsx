import CardTask from "components/cards/cardTask";
import { myWorkMock } from "mocks/profileMock";
import NavigationMenu from "pages/profile/components/navigationMenu";
import React from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";

export default function ProfileReadyTasksPage() {
  const { t } = useTranslation("p_profile", { keyPrefix: "readyTasks" });

  return (
    <div id="page" className="page-container">
      <div className="container-bar">
        <div className="page-content-wrapper">
          <header className="page-content-title">{t("title")}</header>
          {myWorkMock.map((workCard) => (
            <CardTask
              key={workCard.id}
              isClosed={workCard.isClosed}
              title={workCard.title}
              deadlineStartAt={workCard.deadlineStartAt}
              deadlineEndAt={workCard.deadlineEndAt}
              description={workCard.description}
              user={workCard.user}
            />
          ))}
        </div>
        <NavigationMenu />
      </div>
    </div>
  );
}
