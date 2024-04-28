import { Dispatch } from "@reduxjs/toolkit";
import { baseUrl as baseUrlProfile } from "pages/profile/routes";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
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
  const { t } = useTranslation("p_profile");
  const { user } = useSelector(user_selector);
  const dispatch = useDispatch<Dispatch>();
  const location = useLocation();

  const items = [
    {
      route: "/",
      title: t("index.title"),
    },
    {
      route: "/messages",
      title: t("messages.title"),
    },
    {
      route: "/ready-tasks",
      title: t("readyTasks.title"),
    },
    {
      route: "/black-list",
      title: t("blackList.title"),
    },
    {
      route: "/orders",
      title: t("orders.title"),
    },
    {
      route: "/works",
      title: t("works.title"),
    },
  ];

  function renderAvatar() {
    switch (true) {
      case user && !!user.photo: {
        return <img src={user?.photo || ""} alt={user?.username} />;
      }
      default:
        return <ExampleAvatarSvg />;
    }
  }

  function onLogout() {
    dispatch(userActions.logout());
  }

  return (
    <div className="menu-user" onClick={onHide}>
      {renderAvatar()}
      {isOpen && (
        <div className="menu-user__wrapper">
          {(!location.pathname.includes(baseUrlProfile) ||
            location.pathname.includes("/user/")) &&
            items.map((item, index) => (
              <Link
                key={index}
                className="menu-user__item"
                to={baseUrlProfile + item.route}
              >
                {item.title}
              </Link>
            ))}
          <label className="menu-user__item red" onClick={onLogout}>
            Выйти
          </label>
        </div>
      )}
    </div>
  );
}
