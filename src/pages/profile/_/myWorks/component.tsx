import CardTask from "components/cards/cardTask";
import NavigationMenu from "components/navigationMenu";
import { myWorkMock } from "mocks/profileMock";
import { routes, baseUrl } from "pages/profile/routes";
import React from "react";

import "./styles.scss";

export default function ProfileMuWorkPage() {
  return (
    <div id="page" className="page-container">
      <div className="container-bar">
        <div className="page-content-wrapper">
          <header className="page-content-title">Моя работа</header>
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
        <NavigationMenu baseUrl={baseUrl} items={routes} />
      </div>
    </div>
  );
}
