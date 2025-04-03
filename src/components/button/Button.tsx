import { Argument as ArgumentClassNames } from "classnames";
import React, { MouseEvent, ReactNode } from "react";

import InlineLoader from "@/components/loaders/inlineLoader";
import "./Button.scss";

interface Props {
  type?: "submit" | "reset" | "button";
  size?: "very-small" | "small" | "middle" | "big";
  color?: "blue" | "blue-dark" | "green" | "red" | "yellow";
  isTransparent?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  title?: string;
  label?: string;
  disabled?: boolean;
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  classNames?: ArgumentClassNames;
}

Button.defaultProps = {
  type: "button",
  color: "blue",
  size: "middle",
  isTransparent: false,
} as Partial<Props>;

function createButtonClasses(props: Props) {
  const { classNames, fullWidth, disabled, color, isTransparent, size } = props;
  const colorClasses = ["blue", "blue-dark", "green", "red", "yellow"];
  const sizeClasses = ["very-small", "small", "middle", "big"];

  const classes = ["button", classNames];

  if (fullWidth) classes.push("button__full-width");
  if (disabled) classes.push("button__disabled");

  colorClasses.forEach((clr) => {
    if (color === clr) {
      classes.push(`button__${clr}`);
      if (isTransparent) classes.push(`button__${clr} is-transparent`);
    }
  });

  sizeClasses.forEach((sz) => {
    if (size === sz) classes.push(`button__${sz}`);
  });

  return classes.join(" ");
}

export default function Button(props: Props) {
  const buttonClasses = createButtonClasses(props);

  return (
    <button
      disabled={props.disabled}
      type={props.type}
      onClick={props.onClick}
      title={props.title}
      className={buttonClasses}
    >
      {props.isLoading && (
        <div className="button__loading-icon">
          <InlineLoader />
        </div>
      )}
      {props.children || props.label}
    </button>
  );
}
