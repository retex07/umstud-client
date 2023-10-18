import cn, { Argument as ClassNamesArgument } from "classnames";
import React, {
  ChangeEvent,
  FocusEventHandler,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  RefCallback,
  RefObject,
  useState,
} from "react";
import { ReactComponent as HidePasswordSwg } from "static/images/password.svg";
import { ReactComponent as ShowPasswordSwg } from "static/images/show-password.svg";
import { ReactComponent as Warning } from "static/images/warn.svg";
import "./styles.scss";

export interface Props {
  innerRef?: RefObject<HTMLInputElement> | RefCallback<HTMLInputElement>;
  type?: HTMLInputTypeAttribute;
  classNames?: ClassNamesArgument;
  name: string;
  id?: string;
  disabled?: boolean;
  label?: string;
  onClick?: () => void;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  icon?: ReactNode;
  hasError?: boolean;
  errorMessage?: string;
  fullWidth?: boolean;
  readonly?: boolean;
  placeholder?: string;
  required?: boolean;
  value?: InputHTMLAttributes<HTMLInputElement>["value"];
}

export default function Input(props: Props) {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const typeInput =
    props.type == "password"
      ? isShowPassword
        ? "text"
        : "password"
      : props.type;

  return (
    <div
      className={cn("input", props.classNames, {
        "input--full-width": props.fullWidth,
      })}
    >
      {props.label && (
        <div className="input--label-block">
          <label className="input--label">{props.label}</label>
        </div>
      )}
      <div
        className={cn("input--container", props.classNames, {
          "input--container--full-width": props.fullWidth,
          "input--container--warning": props.hasError,
        })}
      >
        <input
          name={props.name}
          required={props.required}
          value={props.value || ""}
          ref={props.innerRef}
          id={props.id || props.name}
          type={typeInput}
          disabled={props.disabled}
          onChange={props.onChange}
          onClick={props.onClick}
          onBlur={props.onBlur}
          readOnly={props.readonly}
          placeholder={props.placeholder}
          className="input--select-from"
        />
        {props.icon && props.type != "password" && (
          <div className="input--after-icon">{props.icon}</div>
        )}
        {props.type == "password" && (
          <div
            className="input--after-icon"
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            {isShowPassword ? <ShowPasswordSwg /> : <HidePasswordSwg />}
          </div>
        )}
      </div>
      {props.hasError && (
        <div className="input--warning">
          <Warning />
          <label className="input--label-warning">{props.errorMessage}</label>
        </div>
      )}
    </div>
  );
}
