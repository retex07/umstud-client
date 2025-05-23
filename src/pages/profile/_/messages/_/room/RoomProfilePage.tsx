import classNames from "classnames";
import { format, isToday, isYesterday, Locale, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { enUS } from "date-fns/locale/en-US";
import i18next from "i18next";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";

import { ENDPOINTS_CONFIG } from "@/api/endpoints";
import { ApiForum } from "@/api/handlers";
import {
  ChatSendMessageWS,
  ChatSocketEventData,
  Message,
} from "@/api/handlers/chat/types";
import {
  FormDataUploadFile_Success,
  ScanResponse,
} from "@/api/handlers/forum/types";
import WebSocketService from "@/api/ws";
import FileAdding from "@/components/FileAdding";
import AvatarUser from "@/components/avatarUser";
import Input from "@/components/input";
import InlineLoader from "@/components/loaders/inlineLoader";
import PageLoader from "@/components/loaders/pageLoader";
import urls from "@/services/router/urls";
import { ReactComponent as SendSvg } from "@/static/images/send.svg";
import { addSocketMessage, getChat } from "@/store/actions/chat";
import { selectChat } from "@/store/selectors/chat";
import { selectUserData } from "@/store/selectors/user";
import { RootState } from "@/store/types";
import { getDraftStorageKey } from "@/utils/chat";
import { getBasePath } from "@/utils/router";
import { isMobileVersion, t } from "@/utils/util";

import MessageItem from "./Message";
import MobileNavigationMenu from "../../../../components/mobileNavigationMenu";
import NavigationMenu from "../../../../components/navigationMenu";

import "../../MessageProfilePage.scss";
import "../../../styles.scss";

function getFormattedDateLabel(dateString: string): string {
  const date = parseISO(dateString);

  if (isToday(date))
    return t("translation", {
      keyPrefix: `utils.dates.today`,
    });
  if (isYesterday(date))
    return t("translation", {
      keyPrefix: `utils.dates.yesterday`,
    });

  const now = new Date();
  const formatStr =
    date.getFullYear() === now.getFullYear() ? "d MMMM" : "d MMMM yyyy";

  const currentLocale = i18next.language;

  const localeMap: Record<string, Locale> = {
    ru: ru,
    en: enUS,
  };

  const dateFnsLocale = localeMap[currentLocale] || enUS;

  return format(date, formatStr, { locale: dateFnsLocale });
}

type MessageWithDateHeader = Message | { type: "date"; label: string };

function groupMessagesWithDateHeaders(
  messages: Message[]
): MessageWithDateHeader[] {
  const result: MessageWithDateHeader[] = [];
  let lastDateLabel = "";

  for (const message of messages) {
    const label = getFormattedDateLabel(message.created_at);

    if (label !== lastDateLabel) {
      result.push({ type: "date", label });
      lastDateLabel = label;
    }

    result.push(message);
  }

  return result;
}

export default function RoomProfilePage() {
  const { t } = useTranslation("p_profile", { keyPrefix: "messages" });

  const scrollRef = useRef<Scrollbars>(null);

  const websocketChatRef = useRef<WebSocketService>(new WebSocketService());
  const websocketScanRef = useRef<WebSocketService>(new WebSocketService());
  const websocketChat = websocketChatRef.current;
  const scanWebsocket = websocketScanRef.current;

  const params = useParams<{ roomId: string }>();
  const websocketChatUrl = urls.chat.room.replace(":roomId", params.roomId);

  const [inputMessage, setInputMessage] = useState("");
  const [chatConnected, setChatConnected] = useState(false);
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [filesUploaded, setFilesUploaded] = useState<
    FormDataUploadFile_Success[]
  >([]);

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

    if (!chatConnected) {
      websocketChat.connect(
        websocketChatUrl,
        () => setChatConnected(true),
        () => setChatConnected(false)
      );
    }

    websocketChat.onMessage((event) => {
      const data: ChatSocketEventData = JSON.parse(event.data);
      console.info("JSON.parse socket dataEvent:", data);
      if (Number(params.roomId)) {
        dispatch(
          addSocketMessage({
            data,
            roomId: Number(params.roomId),
            isMyMessage: data.sender.slug === myProfileData?.slug,
          })
        );
      } else {
        console.error("The specified room does not exist");
      }
    });

    dispatch(getChat(params.roomId));

    return () => {
      if (!!inputMessageRef.current.trim() || !!inputDraft) {
        localStorage.setItem(storageKey, inputMessageRef.current);
      }

      websocketChat.close();
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
    if (!inputMessage && !filesUploaded.length) {
      return;
    }

    if (myProfileData) {
      const sendMessageObj: ChatSendMessageWS = {
        message: inputMessage,
      };

      if (filesUploaded.length) {
        sendMessageObj.file = filesUploaded[0].file_path;
      }

      websocketChat.send<ChatSendMessageWS>(sendMessageObj);
      setInputMessage("");
      setFilesUploaded([]);
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIsLoadingFile(true);
      const file = e.target.files[0];

      ApiForum()
        .uploadFile({ file, type: "chat" })
        .then((res) => {
          if (res.scan_status === "pending") {
            scanWebsocket.connect(
              ENDPOINTS_CONFIG.api.scan.replace(
                ":scanId",
                res.scan_id.toString()
              ),
              () => null,
              () => null,
              () => {
                setIsLoadingFile(false);
                toast.error(t("upload.error"), { duration: 5000 });
                return;
              }
            );

            scanWebsocket.onMessage((event) => {
              const data: ScanResponse = JSON.parse(event.data);
              console.info("JSON.parse socket (scan) dataEvent:", data);
              scanWebsocket.close();

              switch (data.status) {
                case "safe":
                  setFilesUploaded((prevState) => [...prevState, res]);
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
            setFilesUploaded((prevState) => [...prevState, res]);
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

  const messagesWithHeaders = groupMessagesWithDateHeaders(messages);

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
              className={classNames(
                "page-content-title chat-room-page__header_h3",
                {
                  hovered: !!chatRoom?.ad?.id,
                }
              )}
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
            {messagesWithHeaders.map((item, idx) => {
              if ("type" in item && item.type === "date") {
                return (
                  <div
                    key={`date-${idx}`}
                    className="chat-room-page__date-header"
                  >
                    {item.label}
                  </div>
                );
              }

              // @ts-ignore
              return <MessageItem key={idx} {...item} />;
            })}
          </Scrollbars>
          <div className="chat-room-page__send-message">
            <FileAdding
              onChange={handleFileChange}
              countUploadedFiles={filesUploaded.length}
            />
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              fullWidth
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && chatConnected) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              name="send-message"
              placeholder={t("room.messages.input.placeholder")}
            />
            {chatConnected && !isLoadingFile && (
              <button
                className="chat-room-page__send-message_btn"
                title={t("room.messages.input.send")}
                onClick={sendMessage}
              >
                <SendSvg />
              </button>
            )}
            {(!chatConnected || isLoadingFile) && <InlineLoader />}
          </div>
        </div>
        <NavigationMenu />
      </div>
    </div>
  );
}
