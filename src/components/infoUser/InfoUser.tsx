import React from "react";
import { useHistory } from "react-router-dom";

import { DetailUserProfile } from "@/api/handlers/user/types";
import { infoUser, goToUserProfile } from "@/utils/user";

import AvatarUser from "../avatarUser";
import "./InfoUser.scss";

export default function InfoUser(
  props: Pick<
    DetailUserProfile,
    | "last_name"
    | "first_name"
    | "photo"
    | "username"
    | "is_superuser"
    | "is_staff"
    | "slug"
  >
) {
  const history = useHistory();
  return (
    <div className="info-user-component">
      <div className="info-user-component__avatar-container">
        <AvatarUser username={props.username} photo={props.photo} />
      </div>
      <div className="info-user-component__info">
        <h4 className="info-user-component__info_head">
          {infoUser({
            first_name: props.first_name,
            last_name: props.last_name,
            is_superuser: props.is_superuser,
            is_staff: props.is_staff,
          })}
        </h4>
        {props.username && (
          <p
            className="info-user-component__info_descr"
            onClick={() => goToUserProfile(props.slug, history)}
          >
            {props.username}
          </p>
        )}
      </div>
    </div>
  );
}
