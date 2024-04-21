import cn, { Argument as ClassNamesArgument } from "classnames";
import React, { RefCallback, RefObject } from "react";
import Select, {
  Props as SelectProps,
  CSSObjectWithLabel,
  ControlProps,
} from "react-select";
import "./styles.scss";

export interface Props extends Omit<SelectProps, "classNames"> {
  innerRef?: RefObject<HTMLSelectElement> | RefCallback<HTMLSelectElement>;
  hasError?: boolean;
  errorMessage?: string;
  fullWidth?: boolean;
  label?: string;
  classNames?: ClassNamesArgument;
}

export default function CustomSelect({
  hasError,
  errorMessage,
  fullWidth,
  label,
  classNames,
  ...props
}: Props) {
  const customStyles = {
    control: (provided: CSSObjectWithLabel, state: ControlProps) => ({
      ...provided,
      borderRadius: 10,
      minHeight: 50,
      borderColor: hasError
        ? "var(--color-red)"
        : state.isFocused
        ? "var(--color-blue)"
        : "var(--color-gray)",
      "&:hover": {
        borderColor: "var(--color-blue)",
      },
    }),
  };

  return (
    <div
      className={cn("select", classNames, {
        "select__full-width": fullWidth,
      })}
    >
      {label && (
        <div className="select__label-block">
          <label className="select__label">{label}</label>
        </div>
      )}
      <Select {...props} styles={customStyles} />
      {hasError && (
        <div className="select__warning">
          <label className="select__label-warning">{errorMessage}</label>
        </div>
      )}
    </div>
  );
}
