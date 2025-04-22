import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { ChatRoom } from "@/api/handlers/chat/types";
import PageLoader from "@/components/loaders/pageLoader";
import NoDataComponent from "@/components/noData";
import NavigationMenu from "@/pages/profile/components/navigationMenu";
import { ReactComponent as ExampleAvatarSvg } from "@/static/images/example-avatar.svg";
import { getChats } from "@/store/actions/chat";
import { selectChats } from "@/store/selectors/chat";
import { selectIsLoadingChats, selectUserData } from "@/store/selectors/user";
import { getDraftStorageKey } from "@/utils/chat";
import { isMobileVersion } from "@/utils/util";

import MobileNavigationMenu from "../../components/mobileNavigationMenu";

import "./MessageProfilePage.scss";
import "../styles.scss";

export default function MessageProfilePage() {
  const { t } = useTranslation("p_profile", { keyPrefix: "messages" });

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChats());
  }, []);

  const userProfile = useSelector(selectUserData);
  const dataChats = Object.values(useSelector(selectChats));
  const isLoadingChats = useSelector(selectIsLoadingChats) && !dataChats.length;

  function renderAvatar(photo?: string, slug?: string) {
    switch (true) {
      case !!photo: {
        return <img className="inline-user__img" src={photo} alt={slug} />;
      }
      default:
        return (
          <div className="inline-user__img">
            <ExampleAvatarSvg />
          </div>
        );
    }
  }

  function getInterlocutor(chatRoom: ChatRoom) {
    const participants =
      chatRoom?.participants.filter((p) => p.id !== userProfile?.id) || [];

    return participants[0] ?? null;
  }

  function renderChatRoom(chat: ChatRoom) {
    const interlocutor = getInterlocutor(chat);
    const storageKey = getDraftStorageKey(
      userProfile?.slug || "",
      chat.id.toString()
    );

    const inputDraft = localStorage.getItem(storageKey)?.trim();

    if (!inputDraft && !chat.last_message?.content) {
      return null;
    }

    return (
      <div
        onClick={() => history.push(`${location.pathname}/${chat.id}`)}
        className="chats-page__list-item"
        key={chat.id}
      >
        <div className="chats-page__list-item_avatar">
          {renderAvatar(interlocutor.photo, interlocutor.username)}
        </div>
        <div className="chats-page__block-info">
          <h3 className="chats-page__block-info_head">{chat.ad?.title}</h3>
          {(inputDraft || !chat.last_message?.content) && (
            <div className="chats-page__block-info_draft">
              <span className="chats-page__block-info_text draft">
                {t("draft")}
              </span>
              <span className="chats-page__block-info_text">{inputDraft}</span>
            </div>
          )}
          {!inputDraft && chat.last_message?.content && (
            <p className="chats-page__block-info_last-msg">
              {chat.last_message.sender.slug === userProfile?.slug &&
                `${t("you")}: `}
              {chat.last_message.content}
            </p>
          )}
          <p className="chats-page__block-info_last-msg">
            {chat.interlocutor.slug}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id="page" className="page-container chats-page">
      <div className="container-bar">
        <div className="profile-tabs">
          {isMobileVersion() && <MobileNavigationMenu />}
        </div>
        <div className="page-content-wrapper chats-page__wrapper">
          <header className="page-content-title">{t("title")}</header>
          <div className="chats-page__list">
            {isLoadingChats && <PageLoader />}
            {!isLoadingChats && !dataChats?.length && <NoDataComponent />}
            {!isLoadingChats &&
              !!dataChats?.length &&
              dataChats.map((chat) => chat.meta && renderChatRoom(chat.meta))}
          </div>
        </div>
        <NavigationMenu />
      </div>
    </div>
  );
}
