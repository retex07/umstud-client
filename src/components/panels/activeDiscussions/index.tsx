import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { Discussion } from "@/api/handlers/forum/types";
import Button from "@/components/button";
import urls from "@/services/router/urls";
import { ReactComponent as MessageSvg } from "@/static/images/message-circle.svg";
import "../styles.scss";

export default function PanelForumList({
  discussions,
}: {
  discussions: Discussion[];
}) {
  const { t } = useTranslation("p_forum", { keyPrefix: "panel" });
  const history = useHistory();

  function goToForum() {
    history.push(urls.forum.index);
  }

  function goToForumItem(id: Discussion["id"]) {
    history.push(
      urls.forum.index + urls.forum.item.replace(":discussionId", id.toString())
    );
  }

  return (
    <div className="info-panel">
      <h4 className="info-panel_head">{t("active")}</h4>
      <div className="discussion-panel-wrapper">
        {discussions.map(
          (discussion, idx) =>
            idx < 3 && (
              <div
                className="discussion-panel-wrapper__item"
                key={discussion.id}
              >
                <MessageSvg />
                <p
                  className="discussion-panel-wrapper__item_title"
                  onClick={() => goToForumItem(discussion.id)}
                >
                  {discussion.title}
                </p>
              </div>
            )
        )}
      </div>
      <Button
        classNames="info-panel_btn"
        label={t("discussions")}
        fullWidth
        onClick={goToForum}
      />
    </div>
  );
}
