import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import Button from "@/components/button";
import urls from "@/services/router/urls";
import "../styles.scss";

export default function PanelForumCreate() {
  const { t } = useTranslation("p_forum");
  const history = useHistory();

  function goToCreateDiscussion() {
    history.push(urls.forum.index + urls.forum.create);
  }

  return (
    <div className="info-panel">
      <h4 className="info-panel_head">{t("panels.create.title")}</h4>
      <p className="info-panel_descr">{t("panels.create.description")}</p>
      <Button
        classNames="info-panel_btn"
        label={t("actions.create-no-data")}
        fullWidth
        onClick={goToCreateDiscussion}
      />
    </div>
  );
}
