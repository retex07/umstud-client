import cn from "classnames";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./styles.scss";

interface ItemRoute {
  route: string;
  title: string;
}

interface Props {
  baseUrl: string;
  items: ItemRoute[];
}

export default function NavigationMenu(props: Props) {
  const history = useHistory();
  const location = useLocation();

  return (
    <div style={{ position: "relative", display: "flex", width: "267px" }}>
      <div className="navigation-menu">
        {props.items.map((item, index) => (
          <label
            className={cn("navigation-menu__item-route", {
              "navigation-menu__item-route-active":
                location.pathname == props.baseUrl + item.route ||
                (location.pathname == props.baseUrl && item.route == "/"),
            })}
            key={index}
            onClick={() => history.push(props.baseUrl + item.route)}
          >
            {item.title}
          </label>
        ))}
      </div>
    </div>
  );
}
