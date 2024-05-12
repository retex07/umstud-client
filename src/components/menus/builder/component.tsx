import cn, { Argument as ArgumentClassNames } from "classnames";
import { isString } from "lodash";
import React, { ReactNode } from "react";
import "./styles.scss";

interface Item {
  [key: string]: string | (() => void);
}

interface Props {
  items: Item[];
  children?: ReactNode;
  handleClickItem?: (i: Item) => void;
  isActiveItem?: (i: Item) => boolean;
  classNames?: ArgumentClassNames;
  itemClassNames?: ArgumentClassNames;
}

export default function MenuBuilder(props: Props) {
  function handleClick(item: Item) {
    props.handleClickItem && props.handleClickItem(item);
  }

  return (
    <div className={cn("menu-builder", props.classNames)}>
      {props.items?.map((item, index) => (
        <label
          key={index}
          className={cn("menu-builder__item", props.itemClassNames, {
            active: props.isActiveItem && props.isActiveItem(item),
          })}
          onClick={(e) => {
            e.stopPropagation();
            if (!props.isActiveItem || !props.isActiveItem(item)) {
              handleClick(item);
            }
          }}
        >
          {(isString(item.title) && item.title) || ""}
        </label>
      ))}
      {props.children}
    </div>
  );
}
