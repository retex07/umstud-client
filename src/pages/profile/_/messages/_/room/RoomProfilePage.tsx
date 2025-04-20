import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";

import { ChatSendMessageWS } from "@/api/handlers/chat/types";
import { webSocketService } from "@/api/ws";
import AvatarUser from "@/components/avatarUser";
import Input from "@/components/input";
import PageLoader from "@/components/loaders/pageLoader";
import urls from "@/services/router/urls";
import { ReactComponent as SendSvg } from "@/static/images/send.svg";
import { getChat } from "@/store/actions/chat";
import { selectChat } from "@/store/selectors/chat";
import { selectUserData } from "@/store/selectors/user";
import { RootState } from "@/store/types";
import { getDraftStorageKey } from "@/utils/chat";
import { getBasePath } from "@/utils/router";
import { isMobileVersion } from "@/utils/util";

import MobileNavigationMenu from "../../../../components/mobileNavigationMenu";
import NavigationMenu from "../../../../components/navigationMenu";
import "../../MessageProfilePage.scss";
import "../../../styles.scss";

export default function RoomProfilePage() {
  const { t } = useTranslation("p_profile", { keyPrefix: "messages" });

  const websocket = webSocketService;
  const params = useParams<{ roomId: string }>();
  const [inputMessage, setInputMessage] = useState("");
  const inputMessageRef = useRef(inputMessage);

  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();

  const myProfileData = useSelector(selectUserData);
  const storageKey = getDraftStorageKey(
    myProfileData?.slug || "",
    params.roomId
  );
  const inputDraft = localStorage.getItem(storageKey)?.trim();

  useEffect(() => {
    inputMessageRef.current = inputMessage;
  }, [inputMessage]);

  useEffect(() => {
    if (!!inputDraft) {
      setInputMessage(inputDraft);
    }

    websocket.connect(urls.chat.room.replace(":roomId", params.roomId));
    websocket.onMessage((event) => {
      const dataEvent = JSON.parse(event.data);
      console.info("JSON.parse socket dataEvent:", dataEvent);
    });

    dispatch(getChat(params.roomId));

    return () => {
      if (!!inputMessageRef.current.trim() || !!inputDraft) {
        localStorage.setItem(storageKey, inputMessageRef.current);
      }

      websocket.close();
    };
  }, []);

  const { isLoading, meta: chatRoom } = useSelector((state: RootState) =>
    selectChat(state, params.roomId)
  );

  const participants =
    chatRoom?.participants.filter((p) => p.id !== myProfileData?.id) || [];

  const interlocutor = participants[0] ?? null;

  const isLoadingChatRoom = isLoading && !chatRoom;

  if (isLoadingChatRoom) {
    return <PageLoader />;
  }

  const openRootPageMessages = () => {
    history.push(getBasePath(path));
  };

  const openUserProfile = () => {
    if (interlocutor.slug) {
      history.push(
        urls.profile.index +
          urls.profile.item.replace(":profileId", interlocutor.slug)
      );
    }
  };

  const sendMessage = () => {
    if (myProfileData) {
      websocket.send<ChatSendMessageWS>({
        message: inputMessage,
        senderId: myProfileData.id,
      });
      setInputMessage("");
    }
  };

  const renderEmptyMessages = () => {
    if (!interlocutor) {
      return (
        <div className="chat-room-page__empty-messages">
          <h4
            className="chat-room-page__empty-messages-interlocutor_head"
            onClick={openUserProfile}
          >
            {t("room.interlocutor.noData")}
          </h4>
        </div>
      );
    }

    return (
      <div className="chat-room-page__empty-messages">
        <AvatarUser
          classNameImg="chat-room-page__empty-messages_img"
          photo={interlocutor.photo}
          username={interlocutor.username}
        />
        <div className="chat-room-page__empty-messages-interlocutor">
          <h4
            className="chat-room-page__empty-messages-interlocutor_head"
            onClick={openUserProfile}
          >
            {interlocutor.last_name} {interlocutor.first_name}
          </h4>
          <p className="chat-room-page__empty-messages-interlocutor_description">
            {t("room.messages.noData")}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div id="page" className="page-container chats-page">
      <div className="container-bar">
        <div className="profile-tabs">
          {isMobileVersion() && <MobileNavigationMenu />}
        </div>
        <div className="page-content-wrapper chats-page__room-wrapper">
          <header className="chat-room-page__header">
            <div className="chat-room-page__header_link-block">
              <span
                className="chat-room-page__header_text link"
                onClick={openRootPageMessages}
              >
                {t("title")}
              </span>
              <span className="chat-room-page__header_text">-</span>
              <span className="chat-room-page__header_text">
                {interlocutor?.username || chatRoom?.id}
              </span>
            </div>
            <h3 className="page-content-title">
              {t("room.interlocutor.header", {
                interlocutor: interlocutor?.username || chatRoom?.id,
              })}
            </h3>
          </header>
          <div className="chat-room-page__messages">
            {!chatRoom?.messages.length && renderEmptyMessages()}
          </div>
          <div className="chat-room-page__send-message">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              fullWidth
              name="send-message"
              placeholder={t("room.messages.input.placeholder")}
            />
            <button
              className="chat-room-page__send-message_btn"
              title={t("room.messages.input.send")}
              onClick={sendMessage}
            >
              <SendSvg />
            </button>
          </div>
        </div>
        <NavigationMenu />
      </div>
    </div>
  );
}
