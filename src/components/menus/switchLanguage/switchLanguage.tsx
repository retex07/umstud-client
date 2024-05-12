import { languages } from "constants/languages";

import cn, { Argument as ClassNamesArgument } from "classnames";
import MenuBuilder from "components/menus/builder";
import isString from "lodash/isString";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as LanguageSvg } from "static/images/language.svg";
import { menuListener } from "utils/listener.utils";
import "./styles.scss";

interface Props {
  classNames?: ClassNamesArgument;
  onHide: () => void;
  isOpen: boolean;
}

export default function SwitchLanguage(props: Props) {
  const { i18n } = useTranslation();
  const { isOpen = false, onHide, classNames } = props;
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    menuListener(menuRef, isOpen, onHide);
  }, [isOpen, onHide]);

  return (
    <div ref={menuRef} className={cn("switcher", classNames)}>
      <LanguageSvg />
      {props.isOpen && (
        <MenuBuilder
          classNames="switcher__menu"
          items={languages}
          isActiveItem={(i) => i18n.language === i.id}
          handleClickItem={(i) => {
            if (i.id && isString(i.id)) {
              i18n.changeLanguage(i.id).then(props.onHide);
            }
          }}
        />
      )}
    </div>
  );
}
