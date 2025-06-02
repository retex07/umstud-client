import classNames from "classnames";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Tooltip } from "reactstrap";

import { ENDPOINTS_CONFIG } from "@/api/endpoints";
import { ApiForum } from "@/api/handlers";
import {
  CreateComment,
  Discussion,
  ScanResponse,
  Comment,
} from "@/api/handlers/forum/types";
import WebSocketService from "@/api/ws";
import FileAdding from "@/components/FileAdding";
import AvatarUser from "@/components/avatarUser";
import FileApplication from "@/components/fileApplication";
import Input from "@/components/input";
import InlineLoader from "@/components/loaders/inlineLoader";
import PageLoader from "@/components/loaders/pageLoader";
import PanelForumCreate from "@/components/panels/forumCreate";
import PanelOrderCreate from "@/components/panels/orderCreate";
import PanelOrderServices from "@/components/panels/popularServices";
import { useConfirm } from "@/contexts/confirm/hooks";
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
import { dateWithMonthWord, getFullDate, getFullTime } from "@/utils/util";

import "../styles.scss";

export default function ItemForumPage() {
  const { t } = useTranslation("p_forum");
  const { discussionId } = useParams<{ discussionId: string }>();
  const [sendAnswerText, setSendAnswerText] = useState("");
  const [filesUrls, setFilesUrls] = useState<string[]>([]);
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggleTooltip = () => setTooltipOpen((prev) => !prev);
  const tooltipId = `resolved-comment`;

  const dispatch = useDispatch();
  const history = useHistory();
  const { requestConfirm } = useConfirm();

  useEffect(() => {
    dispatch(getDiscussion(discussionId));
  }, []);

  const isLoading = useSelector(selectIsLoadingForum);
  const myProfileData = useSelector(selectUserData);
  const discussion: Discussion | null = useSelector((state: RootState) =>
    selectDiscussion(state, discussionId)
  );

  const resolvedComment = discussion?.resolved_comment;
  const comments: Comment[] = [
    ...(discussion?.comments || []).filter(
      (comment) => !resolvedComment || resolvedComment.id !== comment.id
    ),
  ];
  const isMyDiscussion = discussion?.author.slug === myProfileData?.slug;
  const isReadyDiscussion = discussion?.status === "resolved";

  function openUserProfile(slug: string) {
    history.push(
      urls.profile.index + urls.profile.item.replace(":profileId", slug)
    );
  }

  function goToForum() {
    history.push(urls.forum.index);
  }

  function onSendAnswer() {
    if (!isLoadingFile && !!sendAnswerText.trim()) {
      const sendObjectBoy: CreateComment = { content: sendAnswerText };
      if (filesUrls.length) {
        sendObjectBoy.file = filesUrls[0];
      }

      dispatch(sendAnswer({ discussionId, body: sendObjectBoy }));
      setSendAnswerText("");
      setFilesUrls([]);
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setIsLoadingFile(true);
      const file = e.target.files[0];

      ApiForum()
        .uploadFile({ file, type: "discussion" })
        .then((res) => {
          if (res.scan_status === "pending") {
            const websocket = new WebSocketService();

            websocket.connect(
              ENDPOINTS_CONFIG.api.scan.replace(
                ":scanId",
                res.scan_id.toString()
              ),
              () => null,
              () => {
                setIsLoadingFile(false);
                toast.error(t("upload.error"), { duration: 5000 });
                return;
              }
            );

            websocket.onMessage((event) => {
              const data: ScanResponse = JSON.parse(event.data);
              websocket.close();

              switch (data.status) {
                case "safe":
                  setFilesUrls((prevState) => [...prevState, res.file_path]);
                  setIsLoadingFile(false);
                  toast.success(t("upload.success"), { duration: 5000 });
                  break;

                case "dangerous":
                  setIsLoadingFile(false);
                  toast.error(t("upload.dangerous.error"), { duration: 5000 });
                  return;

                case "error":
                  setIsLoadingFile(false);
                  toast.error(t("upload.error"), { duration: 5000 });
                  return;

                default:
                  return;
              }
            });
          } else {
            setFilesUrls((prevState) => [...prevState, res.file_path]);
            setIsLoadingFile(false);
            toast.success(t("upload.success"), { duration: 5000 });
          }
        })
        .catch((error) => {
          setIsLoadingFile(false);
          console.error(error);
          toast.error(t("upload.error"), { duration: 5000 });
        });
    }
  }

  async function handleConfirmMarkComment(comment: Comment) {
    const substringComment = comment.content.substring(0, 18) + "...";

    const confirm = await requestConfirm(
      t("comment.confirmMark", {
        title: substringComment,
      }),
      true
    );

    if (confirm) {
      ApiForum()
        .markComment(discussionId, { comment_id: comment.id })
        .then(() => {
          dispatch(getDiscussion(discussionId));
          toast.success(t("comment.api.marked", { comment: substringComment }));
        })
        .catch((e) => {
          toast.error(t("comment.api.error"));
          console.error(e);
        });
    }
  }

  function renderDiscussionStatus() {
    switch (discussion?.status) {
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
        {isLoading && <PageLoader />}
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
              <pre className="page-forum-item__block-info_text">
                {discussion.description}
              </pre>
              <p className="page-forum-item__block-info_date">
                {dateWithMonthWord(
                  getFullDate(new Date(discussion.created_at || ""), false)
                )}
              </p>
            </div>
            {(comments.length > 0 || resolvedComment) && (
              <Scrollbars className="page-forum-item__answers">
                {(resolvedComment
                  ? [resolvedComment, ...comments]
                  : comments
                ).map((comment) => (
                  <div
                    key={comment.id}
                    className={classNames("page-forum-item__answers-comment", {
                      "not-ready":
                        !isReadyDiscussion &&
                        isMyDiscussion &&
                        comment.author.slug !== myProfileData?.slug,
                    })}
                  >
                    <div className="comment-wrapper">
                      <div className="comment-content">
                        <AvatarUser
                          classNameImg="page-forum-item__answers-comment_img"
                          photo={comment.author.photo || null}
                          username={comment.author.username}
                        />
                        <div className="page-forum-item__answers-comment_flex">
                          <div className="page-forum-item__answers-comment-info">
                            <label
                              className="page-forum-item__answers-comment_label"
                              onClick={() =>
                                openUserProfile(comment.author.slug)
                              }
                            >
                              {comment.author.last_name}{" "}
                              {comment.author.first_name}
                            </label>
                            <span className="page-forum-item__answers-comment_date">
                              {dateWithMonthWord(
                                getFullDate(new Date(comment.created_at), false)
                              )}{" "}
                              {getFullTime(new Date(comment.created_at))}
                            </span>
                          </div>
                          <div className="message__contents">
                            {comment.file && (
                              <div className="message__contents-files">
                                <FileApplication
                                  formatted_file_size={
                                    comment.formatted_file_size
                                  }
                                  file={comment.file}
                                  original_filename={comment.original_filename}
                                  mime_type={comment.mime_type}
                                />
                              </div>
                            )}
                            <pre className="page-forum-item__answers-comment_content">
                              {comment.content}
                            </pre>
                          </div>
                        </div>
                        {resolvedComment &&
                          resolvedComment.id === comment.id && (
                            <div
                              id={tooltipId}
                              className="page-forum-item__answers-comment_resolved"
                            >
                              <CheckSvg />
                            </div>
                          )}

                        {resolvedComment &&
                          resolvedComment.id === comment.id && (
                            <Tooltip
                              placement="top"
                              isOpen={tooltipOpen}
                              target={tooltipId}
                              toggle={toggleTooltip}
                            >
                              {t("comment.marked")}
                            </Tooltip>
                          )}
                      </div>
                      {!isReadyDiscussion &&
                        isMyDiscussion &&
                        comment.author.slug !== myProfileData?.slug && (
                          <button
                            className="select-best-btn"
                            onClick={() => handleConfirmMarkComment(comment)}
                          >
                            {t("comment.mark")}
                          </button>
                        )}
                    </div>
                  </div>
                ))}
              </Scrollbars>
            )}
            {myProfileData && (
              <div className="page-forum-item__send-answer">
                <FileAdding
                  onChange={handleFileChange}
                  countUploadedFiles={filesUrls.length}
                />
                <Input
                  fullWidth
                  value={sendAnswerText}
                  placeholder={t("input.answer")}
                  onChange={(e) => setSendAnswerText(e.target.value)}
                  name="send-answer"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && !isLoadingFile) {
                      e.preventDefault();
                      onSendAnswer();
                    }
                  }}
                />
                {!isLoadingFile && (
                  <button
                    className="page-forum-item__send-answer_btn"
                    title={t("send")}
                    onClick={onSendAnswer}
                  >
                    <SendSvg />
                  </button>
                )}
                {isLoadingFile && <InlineLoader />}
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
