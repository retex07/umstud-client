import cn from "classnames";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import urls from "@/services/router/urls";
import { ReactComponent as ChevronDownSvg } from "@/static/images/chevron-down.svg";
import { ReactComponent as ChevronUpSvg } from "@/static/images/chevron-up.svg";
import { selectUser } from "@/store/selectors/user";
import "./MobileNavigationMenu.scss";

export default function MobileNavigationMenu() {
  const { t } = useTranslation("p_profile");
  const history = useHistory();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector(selectUser);

  function onChageIsOpen() {
    setIsOpen(!isOpen);
  }

  const items = [
    {
      route: `/user/${user?.slug}`,
      title: t("index.title"),
    },
    {
      route: "/security",
      title: t("security.title"),
    },
    {
      route: "/messages",
      title: t("messages.title"),
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
      onClick={onChageIsOpen}
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
                    location.pathname == urls.profile.index + item.route ||
                    (location.pathname == urls.profile.index &&
                      item.route == "/"),
                })}
                key={index}
                onClick={() => history.push(urls.profile.index + item.route)}
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
