import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";

import {
  ChatSendMessageWS,
  ChatSocketEventData,
} from "@/api/handlers/chat/types";
import { webSocketService } from "@/api/ws";
import AvatarUser from "@/components/avatarUser";
import Input from "@/components/input";
import PageLoader from "@/components/loaders/pageLoader";
import urls from "@/services/router/urls";
import { ReactComponent as SendSvg } from "@/static/images/send.svg";
import { addSocketMessage, getChat } from "@/store/actions/chat";
import { selectChat } from "@/store/selectors/chat";
import { selectUserData } from "@/store/selectors/user";
import { RootState } from "@/store/types";
import { getDraftStorageKey } from "@/utils/chat";
import { getBasePath } from "@/utils/router";
import { isMobileVersion } from "@/utils/util";

import MessageItem from "./Message";
import MobileNavigationMenu from "../../../../components/mobileNavigationMenu";
import NavigationMenu from "../../../../components/navigationMenu";
import "../../MessageProfilePage.scss";
import "../../../styles.scss";

export default function RoomProfilePage() {
  const { t } = useTranslation("p_profile", { keyPrefix: "messages" });

  const websocket = webSocketService;
  const scrollRef = useRef<Scrollbars>(null);
  const params = useParams<{ roomId: string }>();
  const websocketChatUrl = urls.chat.room.replace(":roomId", params.roomId);

  const [inputMessage, setInputMessage] = useState("");
  const [chatConnected, setChatConnected] = useState(false);

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
    if (!chatConnected) {
      websocket.connect(
        websocketChatUrl,
        () => setChatConnected(true),
        () => setChatConnected(false)
      );
    }
  }, [chatConnected]);

  useEffect(() => {
    if (!!inputDraft) {
      setInputMessage(inputDraft);
    }

    websocket.connect(
      websocketChatUrl,
      () => setChatConnected(true),
      () => setChatConnected(false)
    );
    websocket.onMessage((event) => {
      const data: ChatSocketEventData = JSON.parse(event.data);
      console.info("JSON.parse socket dataEvent:", data);
      if (Number(params.roomId)) {
        dispatch(addSocketMessage({ data, roomId: Number(params.roomId) }));
      } else {
        console.error("The specified room does not exist");
      }
    });

    dispatch(getChat(params.roomId));

    return () => {
      if (!!inputMessageRef.current.trim() || !!inputDraft) {
        localStorage.setItem(storageKey, inputMessageRef.current);
      }

      websocket.close();
    };
  }, []);

  const {
    isLoading,
    meta: chatRoom,
    messages,
  } = useSelector((state: RootState) => selectChat(state, params.roomId));

  useEffect(() => {
    scrollRef.current?.scrollToBottom();
  }, [messages]);

  const interlocutor = chatRoom?.interlocutor;
  const isLoadingChatRoom = isLoading && !chatRoom;

  if (isLoadingChatRoom) {
    return <PageLoader />;
  }

  const openRootPageMessages = () => {
    history.push(getBasePath(path));
  };

  const openUserProfile = () => {
    if (interlocutor?.slug) {
      history.push(
        urls.profile.index +
          urls.profile.item.replace(":profileId", interlocutor?.slug)
      );
    }
  };

  const sendMessage = () => {
    if (!inputMessage) {
      return;
    }

    if (myProfileData) {
      websocket.send<ChatSendMessageWS>({
        message: inputMessage,
        senderId: myProfileData.id,
      });
      setInputMessage("");
    }
  };

  const openOrder = () => {
    if (chatRoom?.ad?.id) {
      history.push(
        urls.orders.index +
          urls.orders.item.replace(":orderId", chatRoom?.ad?.id.toString())
      );
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
            <h3
              className={classNames("page-content-title", {
                hovered: !!chatRoom?.ad?.id,
              })}
              onClick={openOrder}
            >
              {chatRoom?.ad?.title ||
                t("room.interlocutor.header", {
                  interlocutor: interlocutor?.username || chatRoom?.id,
                })}
            </h3>
          </header>
          <Scrollbars
            ref={scrollRef}
            autoHide
            className="chat-room-page__messages"
          >
            {!messages.length && renderEmptyMessages()}
            {messages.map((message, idx) => (
              <MessageItem key={idx} {...message} />
            ))}
          </Scrollbars>
          <div className="chat-room-page__send-message">
            <Input
              disabled={!chatConnected}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              fullWidth
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
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
