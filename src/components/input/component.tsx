import cn, { Argument as ClassNamesArgument } from "classnames";
import React, { HTMLInputTypeAttribute, ReactNode, useState } from "react";
import { ReactComponent as HidePasswordSwg } from "static/images/password.svg";
import { ReactComponent as ShowPasswordSwg } from "static/images/show-password.svg";
import { ReactComponent as Warning } from "static/images/warn.svg";
import "./styles.scss";

interface Props {
  type?: HTMLInputTypeAttribute;
  classNames?: ClassNamesArgument;
  name?: string;
  id?: string;
  disabled?: boolean;
  onClick?: () => void;
  onChange?: ({ ...event }) => void;
  icon?: ReactNode;
  hasError?: boolean;
  errorMessage?: string;
  fullWidth?: boolean;
  readonly?: boolean;
  placeholder?: string;
}

export default function Input(props: Props) {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const {
    hasError,
    errorMessage,
    placeholder,
    fullWidth,
    classNames,
    name,
    id,
    disabled,
    onChange,
    onClick,
    icon,
    readonly,
    type,
  } = props;

  const typeInput =
    type == "password" ? (isShowPassword ? "text" : "password") : type;

  return (
    <div
      className={cn("input", classNames, {
        "input--full-width": fullWidth,
      })}
    >
      <div
        className={cn("input--container", classNames, {
          "input--container--full-width": fullWidth,
          "input--container--warning": hasError,
        })}
      >
        <input
          name={name}
          id={id}
          type={typeInput}
          disabled={disabled}
          onChange={onChange}
          onClick={onClick}
          readOnly={readonly}
          placeholder={placeholder}
          className="input--select-from"
        />
        {icon && type != "password" && (
          <div className="input--after-icon">{icon}</div>
        )}
        {type == "password" && (
          <div
            className="input--after-icon"
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            {isShowPassword ? <ShowPasswordSwg /> : <HidePasswordSwg />}
          </div>
        )}
      </div>
      {hasError && (
        <div className="input--warning">
          <Warning />
          <label>{errorMessage}</label>
        </div>
      )}
    </div>
  );
}
