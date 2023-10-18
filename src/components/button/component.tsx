import InlineLoader from "components/loaders/inlineLoader";
import React, { MouseEvent, ReactNode } from "react";
import "./styles.scss";

interface Props {
  type?: "submit" | "reset" | "button";
  size?: "small" | "middle" | "big";
  color?: "blue" | "blue-dark" | "green" | "red" | "yellow";
  isTransparent?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  title?: string;
  label?: string;
  disabled?: boolean;
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

Button.defaultProps = {
  type: "button",
  color: "blue",
  size: "middle",
  isTransparent: false,
} as Partial<Props>;

export default function Button(props: Props) {
  return (
    <button
      disabled={props.disabled}
      type={props.type}
      onClick={props.onClick}
      title={props.title}
      className={`${props.fullWidth && "button--full-width"}
      ${!props.isTransparent && "button--" + props.color} 
      ${props.isTransparent && "button--" + props.color + "--is-transparent"}
      button--${props.size} button`}
    >
      {props.isLoading && (
        <div className="button--loading-icon">
          <InlineLoader />
        </div>
      )}
      {props.children || props.label}
    </button>
  );
}
