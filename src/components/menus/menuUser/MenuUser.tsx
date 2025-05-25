import isObject from "lodash/isObject";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Dropdown from "@/components/Dropdown";
import {
  DropdownSourceType,
  IDropdownProps,
  OptionTypeDropdown,
} from "@/components/Dropdown/Dropdown";
import urls from "@/services/router/urls";
import { ReactComponent as ExampleAvatarSvg } from "@/static/images/example-avatar.svg";
import { logout } from "@/store/actions/auth";
import { selectUserData } from "@/store/selectors/user";
import "./MenuUser.scss";

export default function MenuUser() {
  const { t } = useTranslation("c_menus", { keyPrefix: "menuUser" });
  const user = useSelector(selectUserData);

  const dispatch = useDispatch();
  const history = useHistory();
  const menuRef = useRef<HTMLDivElement>(null);

  const logoutActionValue = logout.toString();

  const items: DropdownSourceType[] = [
    {
      value: urls.index,
      label: t("profile.index"),
    },
    {
      value: urls.profile.security,
      label: t("profile.security"),
    },
    {
      value: logoutActionValue,
      label: t("logout"),
      onClick: onLogout,
      style: { color: "red" },
    },
  ];

  const onChangeDropdown: IDropdownProps["onChange"] = (item) => {
    if (isObject(item) && !!(item as OptionTypeDropdown).value) {
      const source = item as OptionTypeDropdown;
      if (!!source.value && source.value !== logoutActionValue)
        history.push(urls.profile.index + (item as OptionTypeDropdown).value);
    }
  };

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
      <Dropdown
        fieldLabel="label"
        onChange={onChangeDropdown}
        sources={items}
        DropdownMenuElement={renderAvatar()}
        dropdownMenuProps={{ className: "menu-user__dropdown-menu" }}
      />
    </div>
  );
}
