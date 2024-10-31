import { useChats } from "api/chat/queries/chats";
import { CustomUser } from "api/chat/types";
import PageLoader from "components/loaders/pageLoader";
import NavigationMenu from "pages/profile/components/navigationMenu";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { ReactComponent as ExampleAvatarSvg } from "static/images/example-avatar.svg";
import { user as user_selector } from "store/user/user.selectors";
import { isMobileVersion } from "utils/constant.utils";

import MobileNavigationMenu from "../../components/mobileNavigationMenu";
import "../../styles.scss";
import "./styles.scss";

export default function ProfileMessagesPage() {
  const { t } = useTranslation("p_profile", { keyPrefix: "messages" });

  const history = useHistory();
  const location = useLocation();

  const { data: chats, isLoading: isLoadingChats } = useChats();
  const { user: userProfile } = useSelector(user_selector);

  function getRoomUsers(participants: CustomUser[]) {
    return participants.filter((p) => p.username !== userProfile?.username);
  }

  function renderAvatar(photo: string, slug: string) {
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

  return (
    <div id="page" className="page-container chats-page">
      <div className="container-bar">
        <div className="profile-tabs">
          {isMobileVersion() && <MobileNavigationMenu />}
        </div>
        <div className="page-content-wrapper">
          <header className="page-content-title">{t("title")}</header>
          <div className="chats-page__list">
            {isLoadingChats && <PageLoader />}
            {!isLoadingChats &&
              (chats || []).map((chat) => (
                <div
                  onClick={() =>
                    history.push(`${location.pathname}/${chat.id}`)
                  }
                  className="chats-page__list-item"
                  key={chat.id}
                >
                  <div className="chats-page__list-item_avatar">
                    {renderAvatar(
                      chat.participants[0].photo,
                      chat.participants[0].username
                    )}
                  </div>
                  <div className="chats-page__block-info">
                    {getRoomUsers(chat.participants || []).map((user) => (
                      <h3 className="chats-page__block-info_head" key={user.id}>
                        {user.username}
                      </h3>
                    ))}
                    {chat.last_message && chat.last_message.content && (
                      <p className="chats-page__block-info_last-msg">
                        {chat.last_message.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <NavigationMenu />
      </div>
    </div>
  );
}
