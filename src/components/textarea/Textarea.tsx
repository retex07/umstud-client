import cn, { Argument as ClassNamesArgument } from "classnames";
import React, {
  ChangeEvent,
  FocusEventHandler,
  TextareaHTMLAttributes,
  RefCallback,
  RefObject,
} from "react";

import { ReactComponent as Warning } from "@/static/images/warn.svg";
import "./Textarea.scss";

export interface Props {
  innerRef?: RefObject<HTMLTextAreaElement> | RefCallback<HTMLTextAreaElement>;
  classNames?: ClassNamesArgument;
  name: string;
  id?: string;
  disabled?: boolean;
  label?: string;
  onClick?: () => void;
  onChange?(e: ChangeEvent<HTMLTextAreaElement>): void;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  hasError?: boolean;
  errorMessage?: string;
  fullWidth?: boolean;
  readonly?: boolean;
  placeholder?: string;
  required?: boolean;
  resize?: boolean;
  value?: TextareaHTMLAttributes<HTMLTextAreaElement>["value"];
}

Textarea.defaultProps = {
  resize: true,
} as Partial<Props>;

export default function Textarea(props: Props) {
  return (
    <div className={cn("textarea", props.classNames)}>
      {props.label && (
        <div className="textarea__label-block">
          <label className={cn("textarea__label", { require: props.required })}>
            {props.label}
          </label>
        </div>
      )}
      <div
        className={cn("textarea__container", {
          "textarea__full-width": props.fullWidth,
          "textarea__container-warning": props.hasError,
        })}
      >
        <textarea
          name={props.name}
          className={cn("textarea__field", {
            "textarea__no-resize": !props.resize,
          })}
          id={props.id}
          disabled={props.disabled}
          onClick={props.onClick}
          onChange={props.onChange}
          onBlur={props.onBlur}
          readOnly={props.readonly}
          placeholder={props.placeholder}
          value={props.value}
        />
      </div>
      {props.hasError && (
        <div className="textarea__warning">
          <Warning />
          <label className="textarea__label-warning">
            {props.errorMessage}
          </label>
        </div>
      )}
    </div>
  );
}
