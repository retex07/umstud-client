import CardTask from "components/cards/cardTask";
import { myWorkMock } from "mocks/profileMock";
import NavigationMenu from "pages/profile/components/navigationMenu";
import React from "react";

import "./styles.scss";

export default function ProfileMyOrderPage() {
  return (
    <div id="page" className="page-container">
      <div className="container-bar">
        <div className="page-content-wrapper">
          <header className="page-content-title">Мои заказы</header>
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
