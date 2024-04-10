import InlineUser from "components/inlineUser";
import { blackList } from "mocks/profileMock";
import NavigationMenu from "pages/profile/components/navigationMenu";
import React from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";

export default function ProfileBlackListPage() {
  const { t } = useTranslation("p_profile", { keyPrefix: "blackList" });

  return (
    <div id="page" className="page-container">
      <div className="container-bar">
        <div className="page-content-wrapper">
          <header className="page-content-title">{t("title")}</header>
          <section>
            {blackList.map((user) => (
              <div className="black-list" key={user.id}>
                <div className="black-list__user-actions">
                  <InlineUser {...user} />
                  <button className="black-list__user-remove">
                    {t("removeUser")}
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
