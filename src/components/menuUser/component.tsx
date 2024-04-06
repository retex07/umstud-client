import { baseLinkMedias, linkMediaFiles } from "constants/config";

import { Dispatch } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ReactComponent as ExampleAvatarSvg } from "static/images/example-avatar.svg";
import { actions as userActions } from "store/user";
import { user as user_selector } from "store/user/user.selectors";
import { replaceSubstringLink } from "utils/link.utils";
import "./styles.scss";

interface Props {
  isOpen: boolean;
  onHide: () => void;
}

export default function MenuUser(props: Props) {
  const { isOpen, onHide } = props;
  const { user } = useSelector(user_selector);
  const dispatch = useDispatch<Dispatch>();
  const history = useHistory();

  const avatarUrl = replaceSubstringLink(
    user?.photo || "",
    baseLinkMedias,
    linkMediaFiles
  );

  function onLogout() {
    dispatch(userActions.logout());
  }

  if (!user?.photo) {
    return <ExampleAvatarSvg />;
  }

  return (
    <div className="menu-user" onClick={onHide}>
      <img src={avatarUrl} alt={user?.username} />
      {isOpen && (
        <div className="menu-user__wrapper">
          <label
            className="menu-user__item"
            onClick={() => history.push("/profile")}
          >
            Профиль
          </label>
          <label className="menu-user__item red" onClick={onLogout}>
            Выйти
          </label>
        </div>
      )}
    </div>
  );
}
