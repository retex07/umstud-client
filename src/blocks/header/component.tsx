import React from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as LanguageSvg } from "static/images/language.svg";
import { ReactComponent as LogoSvg } from "static/images/logo.svg";
import "./styles.scss";

export default function Header() {
  const { t } = useTranslation("b_header");

  function renderNavigation() {
    return (
      <nav className="navigation--wrapper">
        <ul className="navigation--list">
          <li>
            <NavLink to="/sevices" className="navigation--item-link">
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
    <header className="header header--wrapper">
      <Link to="/">
        <LogoSvg />
      </Link>
      {renderNavigation()}
      <div className="header--change-block">
        <div className="language-block">
          <LanguageSvg />
        </div>
        <Link to="#" className="navigation--item-link">
          {t("login")}
        </Link>
      </div>
    </header>
  );
}
