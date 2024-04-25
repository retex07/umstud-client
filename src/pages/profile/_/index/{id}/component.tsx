import { useUserProfile } from "api/user/queries/userProfile";
import PageLoader from "components/loaders/pageLoader";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { ReactComponent as ExampleAvatarSvg } from "static/images/example-avatar.svg";
import { ReactComponent as FillStarSvg } from "static/images/fill-star.svg";
import { ReactComponent as HollowStarSvg } from "static/images/hollow-star.svg";
import { formatPhoneNumber } from "utils/constant.utils";

import "../styles.scss";

export default function ProfilePage() {
  const { t } = useTranslation("p_profile", { keyPrefix: "index" });
  const params = useParams<{ profileId: string }>();
  const { data: user, isLoading } = useUserProfile(params.profileId);

  function renderAvatar() {
    switch (true) {
      case user && !!user.photo: {
        return <img src={user?.photo || ""} alt={user?.username} />;
      }
      default:
        return <ExampleAvatarSvg />;
    }
  }

  if (isLoading) {
    return <PageLoader />;
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
            </div>
          </header>
          <section className="profile-index--section">
            <h2 className="profile-index--subtitle">{t("rating")}</h2>
            <div>
              {[...Array(Math.round(user?.stars || 0))].map((item, index) => (
                <FillStarSvg key={index} />
              ))}
              {[...Array(5 - Math.round(user?.stars || 0))].map(
                (item, index) => (
                  <HollowStarSvg key={index} />
                )
              )}
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
                    {user.birth_date.toString()}
                  </p>
                </div>
              )}
              {user?.phone && (
                <div className="profile-index--header-info--item">
                  <h3 className="profile-index--text">{t("phone")}</h3>
                  <p className="profile-index--text">
                    {formatPhoneNumber(user.phone)}
                  </p>
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
                    {skill.name}
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
          </section>
        </div>
      </div>
    </div>
  );
}
