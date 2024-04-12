import cn from "classnames";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { ReactComponent as ChevronDownSvg } from "static/images/chevron-down.svg";
import { ReactComponent as ChevronUpSvg } from "static/images/chevron-up.svg";

import { baseUrl as baseUrlProfile } from "../../routes";

import "./styles.scss";

export default function MobileNavigationMenu() {
  const { t } = useTranslation("p_profile");
  const history = useHistory();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  function onChageisOpen() {
    setIsOpen(!isOpen);
  }

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

  function renderChevron() {
    return isOpen ? <ChevronUpSvg /> : <ChevronDownSvg />;
  }

  return (
    <div
      className={cn("mobile-navigation-menu", {
        "mobile-navigation-menu__open": isOpen,
      })}
      onClick={onChageisOpen}
    >
      <div className="mobile-navigation-menu__container">
        <div className="mobile-navigation-menu__wrapper">
          <h4 className="mobile-navigation-menu__title">
            {t("selectSection")}
          </h4>
          {renderChevron()}
        </div>
        {isOpen && (
          <div className="mobile-navigation-menu__item-list">
            {items.map((item, index) => (
              <label
                className={cn("mobile-navigation-menu__item-route", {
                  "navigation-menu__item-route-active":
                    location.pathname == baseUrlProfile + item.route ||
                    (location.pathname == baseUrlProfile && item.route == "/"),
                })}
                key={index}
                onClick={() => history.push(baseUrlProfile + item.route)}
              >
                {item.title}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
