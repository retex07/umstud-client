import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Message } from "@/api/handlers/chat/types";
import AvatarUser from "@/components/avatarUser";
import FileApplication from "@/components/fileApplication";
import CheckRead from "@/pages/profile/components/checkRead";
import urls from "@/services/router/urls";
import { selectUserData } from "@/store/selectors/user";
import { getFullTime } from "@/utils/util";
import "../../MessageProfilePage.scss";

export default function MessageItem(props: Message) {
  const { t } = useTranslation("p_profile", { keyPrefix: "messages" });
  const history = useHistory();
  const myProfileData = useSelector(selectUserData);
  const createdDate = new Date(props.updated_at || props.created_at);

  function openUserProfile() {
    history.push(
      urls.profile.index +
        urls.profile.item.replace(":profileId", props.sender.slug)
    );
  }

  const isMyMessage = props.sender.slug === myProfileData?.slug;

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
          {isMyMessage && `(${t("you")})`}
        </h4>
        <div className="message__views">
          {isMyMessage && <CheckRead isRead={props.is_read} />}
          <span className="message__views_time">
            {getFullTime(createdDate)}
          </span>
        </div>
        <div className="message__contents">
          {props.file && (
            <div className="message__contents-files">
              <FileApplication
                formatted_file_size={props.formatted_file_size}
                file={props.file}
                original_filename={props.original_filename}
                mime_type={props.mime_type}
              />
            </div>
          )}
          <pre className="message__info_content">{props.content}</pre>
        </div>
      </div>
    </div>
  );
}
