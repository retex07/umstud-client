import { DetailUserProfile } from "api/user/types";
import { baseUrl as baseUrlProfile } from "pages/profile/routes";
import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ExampleAvatarSvg } from "static/images/example-avatar.svg";
import "./styles.scss";

export default function InlineUser(user: DetailUserProfile) {
  function renderAvatar() {
    switch (true) {
      case user && !!user.photo: {
        return (
          <img
            className="inline-user__img"
            src={user?.photo || ""}
            alt={user?.username}
          />
        );
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
    <Link className="inline-user" to={baseUrlProfile + "/user/" + user.slug}>
      {renderAvatar()}
      <p className="inline-user__whois">
        {user.last_name} {user.first_name}
      </p>
    </Link>
  );
}
