import cn, { Argument as ClassNamesArgument } from "classnames";
import get from "lodash/get";
import isObject from "lodash/isObject";
import isString from "lodash/isString";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

import Dropdown from "@/components/Dropdown";
import { OptionTypeDropdown } from "@/components/Dropdown/Dropdown";
import { languages } from "@/constants/languages";
import { ReactComponent as LanguageSvg } from "@/static/images/language.svg";
import "./SwitchLanguage.scss";

interface Props {
  classNames?: ClassNamesArgument;
}

export default function SwitchLanguage(props: Props) {
  const { i18n } = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={menuRef} className={cn("switcher", props.classNames)}>
      <Dropdown
        sources={languages}
        fieldLabel="label"
        DropdownMenuElement={<LanguageSvg />}
        dropdownMenuProps={{ className: "switcher__dropdown-menu" }}
        isActive={(i) =>
          !!get(i, "value") && i18n.language === (i as OptionTypeDropdown).value
        }
        onChange={(item) => {
          if (isObject(item)) {
            const source = item as OptionTypeDropdown;
            if (source.value && isString(source.value)) {
              i18n
                .changeLanguage(source.value)
                .then(() => window.location.reload());
            }
          }
        }}
      />
    </div>
  );
}
