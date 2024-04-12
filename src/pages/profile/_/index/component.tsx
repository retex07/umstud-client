import Button from "components/button";
import NavigationMenu from "pages/profile/components/navigationMenu";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ReactComponent as ExampleAvatarSvg } from "static/images/example-avatar.svg";
import { ReactComponent as FillStarSvg } from "static/images/fill-star.svg";
import { user as user_selector } from "store/user/user.selectors";

import "./styles.scss";

export default function ProfileIndexPage() {
  const { t } = useTranslation("p_profile", { keyPrefix: "index" });
  const { user } = useSelector(user_selector);

  const splited = user?.birth_date?.toString().split(".") || [];
  const birthday = new Date(
    Number(splited[2]),
    Number(splited[1]),
    Number(splited[0])
  );

  function renderAvatar() {
    switch (true) {
      case user && !!user.photo: {
        return <img src={user?.photo || ""} alt={user?.username} />;
      }
      default:
        return <ExampleAvatarSvg />;
    }
  }

  return (
    <div id="page" className="page-container profile-index">
      <div className="container-bar">
        <div className="page-content-wrapper">
          <header className="profile-index--header">
            <div className="profile-index--user-avatar">{renderAvatar()}</div>
            <div className="profile-index--header-info">
              <div className="profile-index--user-info">
                <h2 className="profile-index--header-info--title">
                  {user?.last_name} {user?.first_name} {user?.patronymic}
                </h2>
                <p className="profile-index--subtitle">{user?.username}</p>
              </div>
              <div className="profile-index--user-email">{user?.email}</div>
              <div className="profile-index--change-action">
                <Button
                  size="small"
                  label="Редактировать профиль"
                  isTransparent
                />
              </div>
            </div>
          </header>
          <section className="profile-index--section">
            <h2 className="profile-index--subtitle">{t("rating")}</h2>
            <div>
              {[...Array(5)].map((item, index) => (
                <FillStarSvg key={index} />
              ))}
            </div>
          </section>
          {(user?.phone ||
            user?.place_study_work ||
            user?.birth_date ||
            (user?.skills && user.skills.length > 0)) && (
            <section className="profile-index--section">
              <h2 className="profile-index--subtitle">{t("generalInfo")}</h2>
              {user?.birth_date && (
                <div className="profile-index--header-info--item">
                  <h3 className="profile-index--text">{t("birth")}</h3>
                  <p className="profile-index--text">
                    {birthday.getDate()}.{birthday.getMonth()}.
                    {birthday.getFullYear()}
                  </p>
                </div>
              )}
              {user?.phone && (
                <div className="profile-index--header-info--item">
                  <h3 className="profile-index--text">{t("phone")}</h3>
                  <p className="profile-index--text">{user.phone}</p>
                </div>
              )}
              {user?.place_study_work && (
                <div className="profile-index--header-info--item">
                  <h3 className="profile-index--text">{t("workPlace")}</h3>
                  <p className="profile-index--text">{user.place_study_work}</p>
                </div>
              )}
            </section>
          )}
          {user?.skills && user.skills.length > 0 && (
            <section className="profile-index--section">
              <h2 className="profile-index--subtitle">{t("skills")}</h2>
              <ul className="profile-index--ul">
                {user.skills.map((skill, index) => (
                  <li className="profile-index--text" key={index}>
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {user?.description && user.description.length > 0 && (
            <section className="profile-index--section">
              <h2 className="profile-index--subtitle">{t("about")}</h2>
              <p className="profile-index--text">{user.description}</p>
            </section>
          )}
          <section className="profile-index--section">
            <h2 className="profile-index--subtitle">
              {t("exampleTasks.title")}
            </h2>
            <p className="profile-index--text">{t("exampleTasks.nothing")}</p>
            <Button label={t("addWork")} size="small" />
          </section>
        </div>
        <NavigationMenu />
      </div>
    </div>
  );
}
