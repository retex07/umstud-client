import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Message } from "@/api/handlers/chat/types";
import AvatarUser from "@/components/avatarUser";
import urls from "@/services/router/urls";
import { selectUserData } from "@/store/selectors/user";
import "../../MessageProfilePage.scss";

export default function MessageItem(props: Message) {
  const { t } = useTranslation("p_profile", { keyPrefix: "messages" });
  const history = useHistory();
  const myProfileData = useSelector(selectUserData);

  function openUserProfile() {
    history.push(
      urls.profile.index +
        urls.profile.item.replace(":profileId", props.sender.slug)
    );
  }

  return (
    <div className="message">
      <AvatarUser
        classNameImg="message__sender_img"
        username={props.sender.username}
        photo={props.sender.photo}
      />
      <div className="message__info">
        <h4 className="message__info_head" onClick={openUserProfile}>
          {props.sender.last_name} {props.sender.first_name}{" "}
          {props.sender.slug === myProfileData?.slug && `(${t("you")})`}
        </h4>
        <p className="message__info_content">{props.content}</p>
      </div>
    </div>
  );
}
