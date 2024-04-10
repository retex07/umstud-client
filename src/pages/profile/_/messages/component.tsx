import NavigationMenu from "pages/profile/components/navigationMenu";
import React from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";

export default function ProfileMessagesPage() {
  const { t } = useTranslation("p_profile", { keyPrefix: "messages" });

  return (
    <div id="page" className="page-container">
      <div className="container-bar">
        <div className="page-content-wrapper">
          <header className="page-content-title">{t("title")}</header>
        </div>
        <NavigationMenu />
      </div>
    </div>
  );
}
