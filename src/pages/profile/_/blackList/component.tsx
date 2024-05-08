import { useUserList } from "api/user/queries/userList";
import InlineUser from "components/inlineUser";
import PageLoader from "components/loaders/pageLoader";
import MobileNavigationMenu from "pages/profile/components/mobileNavigationMenu";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { user as user_selector } from "store/user/user.selectors";
import { isMobileVersion } from "utils/constant.utils";

import NavigationMenu from "../../components/navigationMenu";
import "../../styles.scss";
import "./styles.scss";

export default function ProfileBlackListPage() {
  const { t } = useTranslation("p_profile", { keyPrefix: "blackList" });

  const { data: users, isLoading } = useUserList();
  const { user: userProfile } = useSelector(user_selector);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div id="page" className="page-container">
      <div className="container-bar">
        <div className="profile-tabs">
          {isMobileVersion() && <MobileNavigationMenu />}
        </div>
        <div className="page-content-wrapper">
          <header className="page-content-title">{t("title")}</header>
          <section>
            {users?.map(
              (user) =>
                userProfile?.slug !== user.slug && (
                  <div className="black-list" key={user.slug}>
                    <div className="black-list__user-actions">
                      <InlineUser {...user} />
                      <button className="black-list__user-remove">
                        {t("removeUser")}
                      </button>
                    </div>
                  </div>
                )
            )}
          </section>
        </div>
        <NavigationMenu />
      </div>
    </div>
  );
}
