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
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [fileName, setFileName] = useState(props.placeholder);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        setFileName(file.name);
        props.onChange && props.onChange(e);
      } else {
        setFileName(props.placeholder);
      }
    }
  };

  const typeInput =
    props.type === "password"
      ? isShowPassword
        ? "text"
        : "password"
      : props.type;

  return (
    <div
      className={cn("input", props.classNames, {
        "input__full-width": props.fullWidth,
      })}
      onClick={props.onClick}
    >
      {props.label && (
        <div className="input__label-block">
          <label className="input__label">{props.label}</label>
        </div>
      )}
      <div
        className={cn("input__container", props.classNames, {
          "input__container-full-width": props.fullWidth,
          "input__container-warning": props.hasError,
          "input__container-file": typeInput === "file",
        })}
      >
        <input
          name={props.name}
          required={props.required}
          value={props.type === "file" ? undefined : props.value || ""}
          ref={props.innerRef}
          id={props.id || props.name}
          type={typeInput}
          disabled={props.disabled}
          onChange={typeInput === "file" ? handleFileChange : props.onChange}
          onClick={props.onClick}
          onBlur={props.onBlur}
          readOnly={props.readonly}
          placeholder={props.placeholder}
          className="input__select-from"
          hidden={props.innerRef && typeInput === "file"}
        />
        {props.innerRef && typeInput === "file" && (
          <div className="input__select-from-file">
            {fileName || props.placeholder}
          </div>
        )}
        {props.icon && props.type !== "password" && (
          <div className="input__after-icon">{props.icon}</div>
        )}
        {props.type === "password" && (
          <div
            className="input__after-icon"
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            {isShowPassword ? <ShowPasswordSwg /> : <HidePasswordSwg />}
          </div>
        )}
      </div>
      {props.hasError && (
        <div className="input__warning">
          <Warning />
          <label className="input__label-warning">{props.errorMessage}</label>
        </div>
      )}
    </div>
  );
}
