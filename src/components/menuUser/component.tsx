import { baseUrl as baseUrlProfile } from "pages/profile/routes";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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

  const dispatch = useDispatch();
  const history = useHistory();
  const menuRef = useRef<HTMLDivElement>(null);

  const items = [
    {
      route: "/",
      title: t("index.title"),
    },
    {
      route: "/security",
      title: t("security.title"),
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onHide();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
        <div className="menu-user__wrapper">
          {items.map((item, index) => (
            <label
              key={index}
              className="menu-user__item"
              onClick={(e) => {
                e.stopPropagation();
                history.push(baseUrlProfile + item.route);
              }}
            >
              {item.title}
            </label>
          ))}
          <label
            className="menu-user__item red"
            onClick={(e) => {
              e.stopPropagation();
              onLogout();
            }}
          >
            Выйти
          </label>
        </div>
      )}
    </div>
  );
}
