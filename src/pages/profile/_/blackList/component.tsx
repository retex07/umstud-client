import InlineUser from "components/inlineUser";
import NavigationMenu from "components/navigationMenu";
import { blackList } from "mocks/profileMock";
import React from "react";

import { routes, baseUrl } from "../../routes";
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
        <NavigationMenu baseUrl={baseUrl} items={routes} />
      </div>
    </div>
  );
}
