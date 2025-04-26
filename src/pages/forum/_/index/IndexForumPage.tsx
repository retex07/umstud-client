import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Discussion, DiscussionStatusTypes } from "@/api/handlers/forum/types";
import AvatarUser from "@/components/avatarUser";
import Button from "@/components/button";
import DateBuilder from "@/components/dateBuilder";
import PageLoader from "@/components/loaders/pageLoader";
import NoDataComponent from "@/components/noData";
import PanelForumCreate from "@/components/panels/forumCreate";
import PanelOrderCreate from "@/components/panels/orderCreate";
import PanelOrderServices from "@/components/panels/popularServices";
import urls from "@/services/router/urls";
import { ReactComponent as CheckSvg } from "@/static/images/check.svg";
import { ReactComponent as LockSvg } from "@/static/images/lock.svg";
import { ReactComponent as PlusSvg } from "@/static/images/plus.svg";
import { getDiscussionList } from "@/store/actions/forum";
import {
  selectDiscussions,
  selectIsLoadingForum,
} from "@/store/selectors/forum";
import { selectUserData } from "@/store/selectors/user";
import { getFullDate } from "@/utils/util";

import "../styles.scss";

export default function ForumPage() {
  const { t } = useTranslation("p_forum");
  const dispatch = useDispatch();
  const history = useHistory();

  const isLoadingDiscussions = useSelector(selectIsLoadingForum);
  const discussions = useSelector(selectDiscussions);
  const myProfileData = useSelector(selectUserData);

  useEffect(() => {
    dispatch(getDiscussionList());
  }, []);

  function goToCreateDiscussion() {
    history.push(urls.forum.index + urls.forum.create);
  }

  function openUserProfile(slug: string) {
    history.push(
      urls.profile.index + urls.profile.item.replace(":profileId", slug)
    );
  }

  function goToDiscussion(id: Discussion["id"]) {
    history.push(
      urls.forum.index + urls.forum.item.replace(":discussionId", id.toString())
    );
  }

  function renderDiscussionStatus(status: DiscussionStatusTypes) {
    switch (status) {
      case "open":
        return (
          <div className="page-forum__card-status open">
            <CheckSvg />
            {t("status.open")}
          </div>
        );
      case "resolved":
        return (
          <div className="page-forum__card-status close">
            <LockSvg />
            {t("status.close")}
          </div>
        );
      default:
        return null;
    }
  }

  function renderCardDiscussion(discussion: Discussion) {
    return (
      <article className="page-forum__card">
        <header
          className="page-forum__card_header"
          onClick={() => goToDiscussion(discussion.id)}
        >
          {discussion.title}
        </header>
        <div className="page-forum__card-content">
          <div className="page-forum__card-content-info">
            <AvatarUser
              classNameImg="page-forum__card-content_img"
              classNameWrapper="page-forum__card-content_wrapper-avatar"
              photo={discussion.author.photo || null}
              username={discussion.author.username}
            />
            <span
              onClick={() => openUserProfile(discussion.author.slug)}
              className="page-forum__card-content_text"
            >
              {discussion.author.last_name} {discussion.author.first_name}
            </span>
          </div>
          <DateBuilder
            dateStartAt={getFullDate(new Date(discussion.created_at || ""))}
            isNotViewEndDate
          />
          {renderDiscussionStatus(discussion.status)}
        </div>
      </article>
    );
  }

  return (
    <div id="page" className="page-container page-forum">
      <PanelOrderServices />
      <div className="page-content-wrapper">
        <header className="page-forum__header">
          <h1 className="page-content-title">{t("title")}</h1>
          {myProfileData && (
            <div className="page-forum_btn-list">
              <Button
                classNames="page-forum_btn"
                size="very-small"
                color="green"
                onClick={goToCreateDiscussion}
              >
                <PlusSvg />
              </Button>
            </div>
          )}
        </header>
        {isLoadingDiscussions && <PageLoader />}
        {!isLoadingDiscussions && !discussions?.length && (
          <div className="page-forum__no-data">
            <NoDataComponent className="page-forum__no-data_logo" />
            <Button
              label={t("actions.create-no-data")}
              onClick={goToCreateDiscussion}
            />
          </div>
        )}
        {discussions.map((discussion) => renderCardDiscussion(discussion))}
      </div>
      <div className="page-forum__panels">
        <PanelForumCreate />
        <PanelOrderCreate />
      </div>
    </div>
  );
}
