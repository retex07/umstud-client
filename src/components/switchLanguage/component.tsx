import { languages } from "constants/languages";

import cn, { Argument as ClassNamesArgument } from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";

interface Props {
  classNames?: ClassNamesArgument;
  onClose: () => void;
}

export default function SwitchLanguage(props: Props) {
  const { i18n } = useTranslation();

  const page = document.getElementById("page");

  page?.addEventListener("click", () => {
    props.onClose();
  });

  return (
    <div className="switcher">
      <div className="switcher__wrapper">
        {languages.map((lan, index) => (
          <label
            className={cn("switcher__item-lan", props.classNames, {
              "switcher__item-lan-selected": i18n.language == lan.id,
            })}
            key={index}
            onClick={() => i18n.changeLanguage(lan.id)}
          >
            {lan.title}
          </label>
        ))}
      </div>
    </div>
  );
}
