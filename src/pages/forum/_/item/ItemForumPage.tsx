import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { Discussion } from "@/api/handlers/forum/types";
import AvatarUser from "@/components/avatarUser";
import Input from "@/components/input";
import PageLoader from "@/components/loaders/pageLoader";
import PanelForumCreate from "@/components/panels/forumCreate";
import PanelOrderCreate from "@/components/panels/orderCreate";
import PanelOrderServices from "@/components/panels/popularServices";
import urls from "@/services/router/urls";
import { ReactComponent as CheckSvg } from "@/static/images/check.svg";
import { ReactComponent as LockSvg } from "@/static/images/lock.svg";
import { ReactComponent as SendSvg } from "@/static/images/send.svg";
import { getDiscussion, sendAnswer } from "@/store/actions/forum";
import {
  selectDiscussion,
  selectIsLoadingForum,
} from "@/store/selectors/forum";
import { selectUserData } from "@/store/selectors/user";
import { RootState } from "@/store/types";
import { getFullDate } from "@/utils/util";

import "../styles.scss";

export default function ItemForumPage() {
  const { t } = useTranslation("p_forum");
  const { discussionId } = useParams<{ discussionId: string }>();
  const [sendAnswerText, setSendAnswerText] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getDiscussion(discussionId));
  }, []);

  const isLoading = useSelector(selectIsLoadingForum);
  const myProfileData = useSelector(selectUserData);
  const discussion: Discussion = useSelector((state: RootState) =>
    selectDiscussion(state, discussionId)
  );

  function openUserProfile(slug: string) {
    history.push(
      urls.profile.index + urls.profile.item.replace(":profileId", slug)
    );
  }

  function goToForum() {
    history.push(urls.forum.index);
  }

  function onSendAnswer() {
    dispatch(sendAnswer({ discussionId, body: { content: sendAnswerText } }));
    setSendAnswerText("");
  }

  function renderDiscussionStatus() {
    switch (discussion.status) {
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

  return (
    <div id="page" className="page-container page-forum">
      <PanelOrderServices />
      <div className="page-content-wrapper page-forum-item">
        {isLoading && !discussion && <PageLoader />}
        {!isLoading && discussion?.author && (
          <>
            <header className="page-forum-item__header">
              <div className="page-forum-item__header-navigation">
                <span
                  className="page-forum-item__header-navigation_link"
                  onClick={goToForum}
                >
                  {t("item.navigation.title")}
                </span>
                <span className="page-forum-item__header-navigation_text">
                  -
                </span>
                <span className="page-forum-item__header-navigation_text">
                  {discussion.title}
                </span>
              </div>
              <h1 className="page-forum-item__header_head">
                {discussion.title}
              </h1>
            </header>
            <div className="page-forum-item__info">
              <div className="page-forum-item__info-user">
                <AvatarUser
                  classNameImg="page-forum-item__info-user_img"
                  username={discussion.author.username}
                  photo={discussion.author.photo || null}
                />
                <div className="page-forum-item__info-user_profile">
                  <p className="page-forum-item__info-user_text">
                    {discussion.author.last_name} {discussion.author.first_name}
                  </p>
                  <p
                    className="page-forum-item__info-user_text link"
                    onClick={() => openUserProfile(discussion.author.slug)}
                  >
                    {discussion.author.slug}
                  </p>
                </div>
              </div>
              {renderDiscussionStatus()}
            </div>
            <div className="page-forum-item__block-info">
              <h3 className="page-forum-item__block-info_head">
                {t("item.posted")}
              </h3>
              <p className="page-forum-item__block-info_text">
                {getFullDate(new Date(discussion.created_at || ""))}
              </p>
            </div>
            <div className="page-forum-item__block-info">
              <h3 className="page-forum-item__block-info_head">
                {t("item.problem")}
              </h3>
              <p className="page-forum-item__block-info_text">
                {discussion.description}
              </p>
            </div>
            {discussion.comments.length > 0 && (
              <Scrollbars className="page-forum-item__answers">
                {discussion.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="page-forum-item__answers-comment"
                  >
                    <AvatarUser
                      classNameImg="page-forum-item__answers-comment_img"
                      photo={comment.author.photo || null}
                      username={comment.author.username}
                    />
                    <div className="page-forum-item__answers-comment_flex">
                      <label
                        className="page-forum-item__answers-comment_label"
                        onClick={() => openUserProfile(comment.author.slug)}
                      >
                        {comment.author.last_name} {comment.author.first_name}
                      </label>
                      <p className="page-forum-item__answers-comment_content">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))}
              </Scrollbars>
            )}
            {myProfileData && (
              <div className="page-forum-item__send-answer">
                <Input
                  fullWidth
                  value={sendAnswerText}
                  placeholder={t("input.answer")}
                  onChange={(e) => setSendAnswerText(e.target.value)}
                  name="send-answer"
                />
                <button
                  className="page-forum-item__send-answer_btn"
                  title={t("send")}
                  onClick={onSendAnswer}
                >
                  <SendSvg />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <div className="page-forum__panels">
        <PanelForumCreate />
        <PanelOrderCreate />
      </div>
    </div>
  );
}
