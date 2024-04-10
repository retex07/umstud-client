import NavigationMenu from "pages/profile/components/navigationMenu";
import React from "react";

import "./styles.scss";

export default function ProfileMessagesPage() {
  return (
    <div id="page" className="page-container">
      <div className="container-bar">
        <div className="page-content-wrapper">
          <header className="page-content-title">Сообщения</header>
        </div>
        <NavigationMenu />
      </div>
    </div>
  );
}
