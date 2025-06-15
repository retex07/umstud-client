import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";

import MenuUser from "@/components/menus/menuUser";
import SwitchLanguage from "@/components/menus/switchLanguage";
import urls from "@/services/router/urls";
import { ReactComponent as CloseMenuSvg } from "@/static/images/exit.svg";
import { ReactComponent as LoginSvg } from "@/static/images/log-in.svg";
import { ReactComponent as LogoSvg } from "@/static/images/logo.svg";
import { ReactComponent as AlignMenuSvg } from "@/static/images/menu-align.svg";
import { ReactComponent as MessagesSvg } from "@/static/images/message-circle.svg";
import { countNotReadChats } from "@/store/selectors/chat";
import { selectUserData } from "@/store/selectors/user";
import { isMobileVersion } from "@/utils/util";
import "./Header.scss";

export default function Header() {
  const { t } = useTranslation("b_header");
  const user = useSelector(selectUserData);
  const selectCountNotReadChats = useSelector(countNotReadChats);
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const history = useHistory();
  const isMobile = isMobileVersion();

  useEffect(() => {
    document.body.style.overflow = isOpenSideBar ? "hidden" : "auto";
  }, [isOpenSideBar]);

  const header = document.querySelector("header");
  window.addEventListener("scroll", (e) => {
    if (e.target && header && window.scrollY > 0) {
      header.classList.add("scroll");
    } else {
      if (header) {
        header.classList.remove("scroll");
      }
    }
  });

  function changeOpenSideBar() {
    setIsOpenSideBar(!isOpenSideBar);
  }

  function openMessages() {
    history.push(urls.profile.index + urls.profile.messages.index);
  }

  function closeSideBar() {
    setIsOpenSideBar(false);
  }

  function renderNavigation() {
    return (
      <nav>
        <ul className="navigation__list">
          <li>
            <NavLink
              to={urls.index}
              className="navigation--item-link"
              onClick={closeSideBar}
            >
              {t("navigation.index")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to={urls.services}
              className="navigation--item-link"
              onClick={closeSideBar}
            >
              {t("navigation.services")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to={urls.orders.index}
              className="navigation--item-link"
              onClick={closeSideBar}
            >
              {t("navigation.orders")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to={urls.forum.index}
              className="navigation--item-link"
              onClick={closeSideBar}
            >
              {t("navigation.forum")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to={urls.rating.index}
              className="navigation--item-link"
              onClick={closeSideBar}
            >
              {t("navigation.rating")}
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <header className="header">
      <div className="header--wrapper">
        <div className="mobile-menu">
          <input
            type="checkbox"
            id="sidebar-checkbox"
            checked={isOpenSideBar}
            onChange={changeOpenSideBar}
            hidden
          />
          <label htmlFor="sidebar-checkbox" className="mobile-menu-icon">
            {isOpenSideBar ? <CloseMenuSvg /> : <AlignMenuSvg />}
          </label>
          {isMobile && (
            <Link to="/">
              <LogoSvg />
            </Link>
          )}
        </div>
        {!isMobile && (
          <Link to="/">
            <LogoSvg />
          </Link>
        )}
        <div className="navigation--wrapper">{renderNavigation()}</div>
        <div className="header--change-block">
          {user && (
            <div className="action-block messages" onClick={openMessages}>
              <MessagesSvg />
              {selectCountNotReadChats > 0 && (
                <div className="action-block__counter">
                  {selectCountNotReadChats}
                </div>
              )}
            </div>
          )}
          <div className="action-block">
            <SwitchLanguage />
          </div>
          {!user && (
            <Link to={urls.auth.index + urls.auth.signIn} className="log-in">
              {!isMobile ? t("login") : <LoginSvg />}
            </Link>
          )}
          {user && (
            <div className="header--user">
              <MenuUser />
            </div>
          )}
        </div>
      </div>
      <div className={`sidebar ${isOpenSideBar && "checked"}`}>
        {renderNavigation()}
      </div>
    </header>
  );
}
