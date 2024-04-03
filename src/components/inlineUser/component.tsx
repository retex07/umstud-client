import { baseUrl as baseUrlProfile } from "pages/profile/routes";
import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ExampleAvatarSvg } from "static/images/example-avatar.svg";
import { User } from "types/user";

import "./styles.scss";
import { convertSlashLink } from "../../utils/link.utils";

export default function InlineUser(user: User) {
  function renderAvatar() {
    if (user.avatar) {
      return (
        <img
          className="inline-user__img"
          src={user.avatar.path}
          alt={user.firstname}
        />
      );
    }

    return (
      <div className="inline-user__img">
        <ExampleAvatarSvg />
      </div>
    );
  }

  return (
    <Link
      className="inline-user"
      to={convertSlashLink([baseUrlProfile, String(user.id)])}
    >
      {renderAvatar()}
      <p className="inline-user__whois">
        {user.lastname} {user.firstname}
      </p>
    </Link>
  );
}
