import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import PanelForumList from "@/components/panels/activeDiscussions";
import PanelForumCreate from "@/components/panels/forumCreate";
import PanelOrderCreate from "@/components/panels/orderCreate";
import PanelOrderServices from "@/components/panels/popularServices";
import { getDiscussionList } from "@/store/actions/forum";
import { selectDiscussions } from "@/store/selectors/forum";
import "./RatingPage.scss";

export default function RatingPage() {
  const { t } = useTranslation("p_rating");

  const dispatch = useDispatch();

  const discussions = useSelector(selectDiscussions);

  useEffect(() => {
    dispatch(getDiscussionList());
  }, []);

  return (
    <div id="page" className="page-container with-panels">
      <div className="flex-panels">
        <PanelOrderCreate />
        <PanelOrderServices />
      </div>
      <div className="page-content-wrapper">
        <header>
          <h3 className="page-content-title">{t("title")}</h3>
        </header>
      </div>
      <div className="flex-panels">
        <PanelForumCreate />
        {discussions.length > 0 && <PanelForumList discussions={discussions} />}
      </div>
    </div>
  );
}
