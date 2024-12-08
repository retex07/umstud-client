import { DetailUserProfile } from "api/user/types";
import React from "react";
import { ReactComponent as ExampleAvatarSvg } from "static/images/example-avatar.svg";

export default function AvatarUser(
  props: Pick<DetailUserProfile, "photo" | "username">
) {
  switch (true) {
    case !!props.photo: {
      return <img src={props.photo || ""} alt={props.username} />;
    }
    default:
      return <ExampleAvatarSvg />;
  }
}
