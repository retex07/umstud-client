import MenuBuilder from "components/menus/builder";
import { baseUrl } from "pages/profile/routes";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ReactComponent as ExampleAvatarSvg } from "static/images/example-avatar.svg";
import { actions as userActions } from "store/user";
import { user as user_selector } from "store/user/user.selectors";
import { menuListener } from "utils/listener.utils";
import "../builder/styles.scss";
import "./styles.scss";

interface Props {
  isOpen: boolean;
  onHide: () => void;
}

export default function MenuUser(props: Props) {
  const { isOpen, onHide } = props;
  const { t } = useTranslation("c_menus", { keyPrefix: "menuUser" });
  const { user } = useSelector(user_selector);

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
    dispatch(userActions.logout());
  }

  return (
    <div ref={menuRef} className="menu-user">
      {renderAvatar()}
      {isOpen && (
        <MenuBuilder
          items={items}
          handleClickItem={(i) => history.push(baseUrl + i.route)}
        >
          <label
            className="menu-builder__item red"
            onClick={(e) => {
              e.stopPropagation();
              onLogout();
            }}
          >
            {t("logout")}
          </label>
        </MenuBuilder>
      )}
    </div>
  );
}
