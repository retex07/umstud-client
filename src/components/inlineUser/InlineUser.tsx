import React from "react";
import { Link } from "react-router-dom";

import urls from "@/services/router/urls";
import { ReactComponent as ExampleAvatarSvg } from "@/static/images/example-avatar.svg";
import { infoUser } from "@/utils/user";
import "./InlineUser.scss";

interface Props {
  is_staff?: boolean;
  is_superuser?: boolean;
  patronymic?: string | null;
  slug: string;
  last_name: string;
  first_name: string;
  photo: string;
}

export default function InlineUser(props: Props) {
  function renderAvatar() {
    switch (true) {
      case !!props.photo: {
        return (
          <img
            className="inline-user__img"
            src={props.photo}
            alt={props.slug}
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
    <Link
      className="inline-user"
      to={urls.profile.index + "/user/" + props.slug}
    >
      <picture>{renderAvatar()}</picture>
      <span className="inline-user__whois">
        {infoUser({
          first_name: props.first_name,
          last_name: props.last_name,
          patronymic: props.patronymic,
          is_staff: props.is_staff,
          is_superuser: props.is_superuser,
        })}
      </span>
    </Link>
  );
}
