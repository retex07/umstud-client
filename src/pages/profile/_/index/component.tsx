import Button from "components/button";
import NavigationMenu from "components/navigationMenu";
import { ProfileMock } from "mocks/profileMock";
import { routes, baseUrl } from "pages/profile/routes";
import React from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as EditSvg } from "static/images/edit.svg";
import { ReactComponent as ExampleAvatarSvg } from "static/images/example-avatar.svg";
import { ReactComponent as FillStarSvg } from "static/images/fill-star.svg";

import "./styles.scss";

export default function ProfileIndexPage() {
  const { t } = useTranslation("p_profile", { keyPrefix: "index" });

  return (
    <div id="page" className="page-container profile-index">
      <div className="profile-index--container">
        <div className="page-content-wrapper">
          <header className="profile-index--header">
            <ExampleAvatarSvg />
            <div className="profile-index--header-info">
              <div className="profile-index--header-info--wrapper">
                <div className="profile-index--header-info--wrapper-text">
                  <h2 className="profile-index--header-info--title">
                    {ProfileMock.userFullName}
                  </h2>
                  <p className="profile-index--subtitle">
                    {ProfileMock.nickname}
                  </p>
                  <div>
                    {[...Array(5)].map((item, index) => (
                      <FillStarSvg key={index} />
                    ))}
                  </div>
                </div>
                <EditSvg />
              </div>
              <div className="profile-index--header-info--description">
                <div className="profile-index--header-info--item">
                  <h3 className="profile-index--text">{t("birth")}</h3>
                  <p className="profile-index--text">{ProfileMock.birthday}</p>
                </div>
                <div className="profile-index--header-info--item">
                  <h3 className="profile-index--text">{t("phone")}</h3>
                  <p className="profile-index--text">{ProfileMock.phone}</p>
                </div>
                <div className="profile-index--header-info--item">
                  <h3 className="profile-index--text">{t("email")}</h3>
                  <p className="profile-index--text">{ProfileMock.email}</p>
                </div>
                <div className="profile-index--header-info--item">
                  <h3 className="profile-index--text">{t("workPlace")}</h3>
                  <p className="profile-index--text">{ProfileMock.address}</p>
                </div>
              </div>
            </div>
          </header>
          <section className="profile-index--section">
            <h2 className="profile-index--subtitle">{t("skills")}</h2>
            <ul className="profile-index--ul">
              {ProfileMock.skills.map((skill, index) => (
                <li className="profile-index--text" key={index}>
                  {skill}
                </li>
              ))}
            </ul>
          </section>
          <section className="profile-index--section">
            <h2 className="profile-index--subtitle">{t("about")}</h2>
            <p className="profile-index--text">{ProfileMock.aboutMe}</p>
          </section>
          <section className="profile-index--section">
            <h2 className="profile-index--subtitle">
              {t("exampleTasks.title")}
            </h2>
            <p className="profile-index--text">{t("exampleTasks.nothing")}</p>
            <Button label="Добавить работу" size="middle" />
          </section>
        </div>
        <NavigationMenu baseUrl={baseUrl} items={routes} />
      </div>
    </div>
  );
}