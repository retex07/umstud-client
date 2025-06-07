import classNames from "classnames";
import React, { HTMLAttributes, useState } from "react";

import { ReactComponent as CheckSvg } from "@/static/images/check.svg";
import "./Checkbox.scss";

export interface CheckboxProps
  extends Omit<HTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  disabled?: boolean;
  isControl?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  classNameWrapper?: string;
}

export default function Checkbox({
  label,
  defaultChecked = false,
  onChange,
  disabled,
  className,
  checked: pChecked,
  classNameWrapper,
  isControl,
  ...checkboxAttributes
}: CheckboxProps) {
  const [checked, setChecked] = useState(defaultChecked);
  const fieldChecked = isControl ? !!pChecked : checked;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setChecked(e.target.checked);
    onChange && onChange(e.target.checked);
  }

  return (
    <label className={classNames("umstud-checkbox", classNameWrapper)}>
      <input
        {...checkboxAttributes}
        className="umstud-checkbox_hidden"
        hidden
        type="checkbox"
        disabled={disabled}
        checked={fieldChecked}
        onChange={handleChange}
      />
      <div
        className={classNames("umstud-checkbox__field", className, {
          disabled,
          active: fieldChecked,
        })}
      >
        {fieldChecked && <CheckSvg />}
      </div>
      {label && <span className="umstud-checkbox_span">{label}</span>}
    </label>
  );
}
