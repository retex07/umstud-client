import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";

import MenuUser from "@/components/menus/menuUser";
import SwitchLanguage from "@/components/menus/switchLanguage";
import urls from "@/services/router/urls";
import { ReactComponent as CloseMenuSvg } from "@/static/images/exit.svg";
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
  const [isOpenSwitcher, setIsOpenSwitcher] = useState(false);
  const [isOpenMenuUser, setIsOpenMenuUser] = useState(false);
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
    setIsOpenSwitcher(false);
    setIsOpenMenuUser(false);
  }
  function changeOpenSwitcher() {
    setIsOpenSwitcher(!isOpenSwitcher);
    setIsOpenSideBar(false);
    setIsOpenMenuUser(false);
  }
  function changeOpenMenuUser() {
    setIsOpenMenuUser(!isOpenMenuUser);
    setIsOpenSideBar(false);
    setIsOpenSwitcher(false);
  }

  function openMessages() {
    history.push(urls.profile.index + urls.profile.messages.index);
  }

  function renderNavigation() {
    return (
      <nav>
        <ul className="navigation--list">
          <li>
            <NavLink to="/" className="navigation--item-link">
              {t("navigation.index")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className="navigation--item-link">
              {t("navigation.services")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className="navigation--item-link">
              {t("navigation.orders")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/forum" className="navigation--item-link">
              {t("navigation.forum")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/rating" className="navigation--item-link">
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
          <div className="action-block" onClick={changeOpenSwitcher}>
            <SwitchLanguage
              isOpen={isOpenSwitcher}
              onHide={changeOpenSwitcher}
            />
          </div>
          {!user && (
            <Link to="/auth/sign-in" className="log-in">
              {t("login")}
            </Link>
          )}
          {user && (
            <div className="header--user" onClick={changeOpenMenuUser}>
              <MenuUser isOpen={isOpenMenuUser} onHide={changeOpenMenuUser} />
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
