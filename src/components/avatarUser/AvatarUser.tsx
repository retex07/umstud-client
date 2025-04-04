import React from "react";

import { DetailUserProfile } from "@/api/user/types";
import { ReactComponent as ExampleAvatarSvg } from "@/static/images/example-avatar.svg";

export default function AvatarUser(
  props: Pick<DetailUserProfile, "photo" | "username"> & {
    classNameImg?: string;
    classNameWrapper?: string;
  }
) {
  let content;

  switch (true) {
    case !!props.photo: {
      content = (
        <img
          className={props.classNameImg}
          src={props.photo || ""}
          alt={props.username}
        />
      );
      break;
    }

    default:
      content = <ExampleAvatarSvg />;
      break;
  }

  return <div className={props.classNameWrapper}>{content}</div>;
}
