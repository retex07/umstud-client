import InlineUser from "components/inlineUser";
import { blackList } from "mocks/profileMock";
import NavigationMenu from "pages/profile/components/navigationMenu";
import React from "react";

import "./styles.scss";

export default function ProfileBlackListPage() {
  return (
    <div id="page" className="page-container">
      <div className="container-bar">
        <div className="page-content-wrapper">
          <header className="page-content-title">Черный список</header>
          <section>
            {blackList.map((user) => (
              <div className="black-list" key={user.id}>
                <div className="black-list__user-actions">
                  <InlineUser {...user} />
                  <button className="black-list__user-remove">
                    Удалить из списка
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>
        <NavigationMenu />
      </div>
    </div>
  );
}
