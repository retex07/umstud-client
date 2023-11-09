import SwitchLanguage from "components/switchLanguage";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as CloseMenuSvg } from "static/images/exit.svg";
import { ReactComponent as LanguageSvg } from "static/images/language.svg";
import { ReactComponent as LogoSvg } from "static/images/logo.svg";
import { ReactComponent as AlignMenuSvg } from "static/images/menu-align.svg";
import "./styles.scss";

export default function Header() {
  const { t } = useTranslation("b_header");
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [isOpenSwitcher, setIsOpenSwitcher] = useState(false);

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
  function changeOpenSwitcher() {
    setIsOpenSwitcher(!isOpenSwitcher);
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
          <li>
            <NavLink to="/contacts" className="navigation--item-link">
              {t("navigation.contacts")}
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
        </div>
        <Link to="/">
          <LogoSvg />
        </Link>
        <div className="navigation--wrapper">{renderNavigation()}</div>
        <div className="header--change-block">
          <div className="language-block" onClick={changeOpenSwitcher}>
            <LanguageSvg />
            {isOpenSwitcher && <SwitchLanguage onClose={changeOpenSwitcher} />}
          </div>
          <Link to="/auth/sign-in" className="log-in">
            {t("login")}
          </Link>
        </div>
      </div>
      <div className={`sidebar ${isOpenSideBar && "checked"}`}>
        {renderNavigation()}
      </div>
    </header>
  );
}
