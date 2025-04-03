import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import MenuBuilder from "@/components/menus/builder";
import urls from "@/services/router/urls";
import { ReactComponent as ExampleAvatarSvg } from "@/static/images/example-avatar.svg";
import { logout } from "@/store/actions/auth";
import { selectUserData } from "@/store/selectors/user";
import { menuListener } from "@/utils/listener";
import "../builder/Builder.scss";
import "./MenuUser.scss";

interface Props {
  isOpen: boolean;
  onHide: () => void;
}

export default function MenuUser(props: Props) {
  const { isOpen, onHide } = props;
  const { t } = useTranslation("c_menus", { keyPrefix: "menuUser" });
  const user = useSelector(selectUserData);

  const dispatch = useDispatch();
  const history = useHistory();
  const menuRef = useRef<HTMLDivElement>(null);

  const items = [
    {
      route: "/",
      title: t("profile.index"),
    },
    {
      route: "/security",
      title: t("profile.security"),
    },
  ];

  useEffect(() => {
    menuListener(menuRef, isOpen, onHide);
  }, [isOpen, onHide]);

  function renderAvatar() {
    switch (true) {
      case user && !!user.photo:
        return <img src={user?.photo || ""} alt={user?.username} />;
      default:
        return <ExampleAvatarSvg />;
    }
  }

  function onLogout() {
    dispatch(logout());
  }

  return (
    <div ref={menuRef} className="menu-user">
      {renderAvatar()}
      {isOpen && (
        <MenuBuilder
          items={items}
          handleClickItem={(i) => history.push(urls.profile.index + i.route)}
        >
          <label className="menu-builder__item red" onClick={onLogout}>
            {t("logout")}
          </label>
        </MenuBuilder>
      )}
    </div>
  );
}
