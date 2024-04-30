import cn from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";

import { baseUrl as baseUrlProfile } from "../../routes";

import "./styles.scss";

export default function NavigationMenu() {
  const { t } = useTranslation("p_profile");
  const history = useHistory();
  const location = useLocation();

  const items = [
    {
      route: "/",
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

  return (
    <div className="navigation-menu__container">
      <div className="navigation-menu">
        {items.map((item, index) => (
          <label
            className={cn("navigation-menu__item-route", {
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
    </div>
  );
}
