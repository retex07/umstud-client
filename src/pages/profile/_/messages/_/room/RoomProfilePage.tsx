import React from "react";
import { useParams } from "react-router-dom";

import { useChatRoom } from "@/api/chat/queries/room";
import PageLoader from "@/components/loaders/pageLoader";
import { isMobileVersion } from "@/utils/util";

import MobileNavigationMenu from "../../../../components/mobileNavigationMenu";
import NavigationMenu from "../../../../components/navigationMenu";
import "../../MessageProfilePage.scss";

export default function RoomProfilePage() {
  const params = useParams<{ messageId: string }>();
  const { data: chatRoom, isLoading: isLoadingChatRoom } = useChatRoom(
    params.messageId
  );

  if (isLoadingChatRoom) {
    return <PageLoader />;
  }

  return (
    <div id="page" className="page-container chats-page">
      <div className="container-bar">
        <div className="profile-tabs">
          {isMobileVersion() && <MobileNavigationMenu />}
        </div>
        <div className="page-content-wrapper">
          <header className="page-content-title">{chatRoom?.id}</header>
        </div>
        <NavigationMenu />
      </div>
    </div>
  );
}
