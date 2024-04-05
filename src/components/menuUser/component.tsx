import { Dispatch } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as ExampleAvatarSvg } from "static/images/example-avatar.svg";
import { actions as userActions } from "store/user";
import { user as user_selector } from "store/user/user.selectors";

import "./styles.scss";

interface Props {
  isOpen: boolean;
  onHide: () => void;
}

export default function MenuUser(props: Props) {
  const { isOpen, onHide } = props;
  const { user } = useSelector(user_selector);
  const dispatch = useDispatch<Dispatch>();

  function onLogout() {
    dispatch(userActions.logout());
  }

  if (!user?.photo) {
    return <ExampleAvatarSvg />;
  }

  return (
    <div onClick={onHide}>
      <img src={user.photo} alt={user?.username} />
      {isOpen && (
        <div className="menu-user">
          <label className="menu-user__item">Профиль</label>
          <label className="menu-user__item red" onClick={onLogout}>
            Выйти
          </label>
        </div>
      )}
    </div>
  );
}
