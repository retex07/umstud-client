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
  afterItem?: ReactNode;
  isWarning?: boolean;
  fullWidth?: boolean;
  readonly?: boolean;
}

export default function Input(props: Props) {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const {
    isWarning,
    fullWidth,
    classNames,
    name,
    id,
    disabled,
    onChange,
    onClick,
    afterItem,
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
          "input--container--warning": isWarning,
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
          className="input--select-from"
        />
        {afterItem && type != "password" && (
          <div className="input--after-icon">{afterItem}</div>
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
      {isWarning && (
        <div className="input--warning">
          <Warning />
          <label>Ошибка</label>
        </div>
      )}
    </div>
  );
}
