import React from "react";
import toast, { Toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";

import { NotificationChatSocketEventData } from "@/api/handlers/chat/types";
import AvatarUser from "@/components/avatarUser";
import urls from "@/services/router/urls";

import "./styles.scss";

type ChatMessageToastProps = {
  t: Toast;
  message: NotificationChatSocketEventData;
};

export default function ChatMessageToast({
  message,
  t,
}: ChatMessageToastProps) {
  const history = useHistory();
  const { username, first_name, last_name } = message.sender;

  function goToChat() {
    console.log(t.id);
    toast.dismiss(t.id);

    history.push(
      urls.profile.index +
        urls.profile.messages.item.replace(
          ":roomId",
          message.room_id.toString()
        )
    );
  }

  return (
    <div className="umstud-custom-toast" onClick={goToChat}>
      <AvatarUser
        classNameImg="umstud-custom-toast_img"
        username={username}
        photo={message.sender.photo}
      />
      <div className="umstud-custom-toast__content">
        <h3 className="umstud-custom-toast__content_head">
          {`${last_name} ${first_name}`}
        </h3>
        <p className="umstud-custom-toast__content_description">
          {message.message_preview}
        </p>
      </div>
    </div>
  );
}
