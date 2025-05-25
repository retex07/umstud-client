import classNames from "classnames";
import isFunction from "lodash/isFunction";
import isObject from "lodash/isObject";
import isString from "lodash/isString";
import React, {
  CSSProperties,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  DropdownItem,
  DropdownMenu as ReactDropdownMenu,
  Dropdown as ReactDropdown,
} from "reactstrap";
import { DropdownProps as ReactDropdownProps } from "reactstrap/types/lib/Dropdown";
import { DropdownMenuProps as ReactDropdownMenuProps } from "reactstrap/types/lib/DropdownMenu";

import { ReactComponent as ChevronDownSvg } from "@/static/images/chevron-down.svg";
import { ReactComponent as ChevronUpSvg } from "@/static/images/chevron-up.svg";
import "./Dropdown.scss";

export type OptionTypeDropdown = HTMLAttributes<HTMLElement> & {
  [key: string]: string | number | (() => void) | CSSProperties;
};

export type DropdownSourceType = OptionTypeDropdown;

type DropdownBaseProps = {
  dropdownMenuProps?: ReactDropdownMenuProps;
  sources: DropdownSourceType[];
  onChange?: (i: DropdownSourceType) => void;
  isActive?: (i: DropdownSourceType) => void;
  isStatic?: boolean;
  uncontrolled?: boolean;
  isOpen?: boolean;
  toggle?: () => void;
  fieldLabel: string;
  fieldValue?: string;
} & Omit<ReactDropdownProps, "onChange">;

type DropdownWithCustomMenu = {
  DropdownMenuElement: React.ReactNode;
  label?: never;
};

type DropdownWithLabel = {
  DropdownMenuElement?: undefined;
  label: string;
};

export type IDropdownProps = DropdownBaseProps &
  (DropdownWithCustomMenu | DropdownWithLabel);

Dropdown.defaultProps = {
  isStatic: true,
  uncontrolled: true,
};

export default function Dropdown(props: IDropdownProps) {
  const {
    dropdownMenuProps,
    DropdownMenuElement,
    label,
    sources,
    onChange,
    isStatic,
    uncontrolled,
    fieldLabel,
    isActive,
    isOpen: propsIsOpen,
    toggle,
  } = props;

  const [dropdownLabel, setDropdownLabel] = useState<string>(label || "");
  const [stateIsOpenDropdown, setStateIsOpenDropdown] = useState(false);
  const [alignRight, setAlignRight] = useState(false);

  const itemsRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isOpenDropdown = uncontrolled ? stateIsOpenDropdown : propsIsOpen;

  useEffect(() => {
    if (isOpenDropdown && dropdownRef.current && itemsRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const itemsWidth = itemsRef.current.offsetWidth;
      setAlignRight(rect.left + itemsWidth > window.innerWidth);
    }
  }, [isOpenDropdown]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (uncontrolled) {
          setStateIsOpenDropdown(false);
        }

        if (isFunction(toggle)) {
          toggle();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [uncontrolled, toggle]);

  useEffect(() => {
    if (!isOpenDropdown) {
      document.activeElement instanceof HTMLElement &&
        document.activeElement.blur();
    }
  }, [isOpenDropdown]);

  function renderDropdownMenu() {
    if (DropdownMenuElement) {
      return DropdownMenuElement;
    }

    return (
      <button className="umstud-dropdown__menu_btn">
        <span className="umstud-dropdown__menu_btn_span">{dropdownLabel}</span>
        {isOpenDropdown ? <ChevronUpSvg /> : <ChevronDownSvg />}
      </button>
    );
  }

  function renderItemSource(item: DropdownSourceType) {
    const isActiveItem = isFunction(isActive) && isActive(item);
    const classNamesDropdownItem = classNames("umstud-dropdown__item", {
      active: isActiveItem,
    });

    switch (true) {
      case isString(item):
      case React.isValidElement(item):
        return (
          <DropdownItem
            onClick={() => onChangeSelectSource(item)}
            className={classNamesDropdownItem}
          >
            {item}
          </DropdownItem>
        );

      case isObject(item):
        const source = item as OptionTypeDropdown;
        const { onClick, ...htmlAttributes } = source;

        const itemLabel =
          !isFunction(source[fieldLabel]) &&
          !isObject(source[fieldLabel]) &&
          source[fieldLabel];

        return (
          <DropdownItem
            {...htmlAttributes}
            onClick={(e) => {
              onChangeSelectSource(item);
              isFunction(onClick) && onClick(e);
            }}
            className={classNamesDropdownItem}
          >
            {itemLabel}
          </DropdownItem>
        );

      default:
        return null;
    }
  }

  function toggleOpenDropdown() {
    if (uncontrolled) {
      setStateIsOpenDropdown(!stateIsOpenDropdown);
    }

    if (isFunction(toggle)) {
      toggle();
    }
  }

  function onChangeSelectSource(item: DropdownSourceType) {
    if (isObject(item)) {
      const source = item as OptionTypeDropdown;
      const labelItem = source[fieldLabel];

      if (!isStatic && isString(labelItem)) {
        setDropdownLabel(labelItem);
      }
    }

    isFunction(onChange) && onChange(item);
  }

  return (
    <div ref={dropdownRef}>
      <ReactDropdown
        className="umstud-dropdown"
        toggle={toggleOpenDropdown}
        isOpen={isOpenDropdown}
      >
        <div onClick={toggleOpenDropdown}>
          <ReactDropdownMenu
            {...dropdownMenuProps}
            className={classNames(
              "umstud-dropdown__menu",
              dropdownMenuProps?.className
            )}
          >
            {renderDropdownMenu()}
          </ReactDropdownMenu>
        </div>
        {isOpenDropdown && (
          <div
            ref={itemsRef}
            className={classNames("umstud-dropdown__items", {
              "umstud-dropdown__items--right": alignRight,
            })}
            style={alignRight ? { right: 0, left: "auto" } : undefined}
          >
            {sources.map((item, idx) => (
              <React.Fragment key={idx}>
                {renderItemSource(item)}
              </React.Fragment>
            ))}
          </div>
        )}
      </ReactDropdown>
    </div>
  );
}
