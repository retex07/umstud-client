import React, { FocusEventHandler } from "react";
import "./styles.scss";

interface Props {
  name: string;
  id?: string;
  listDrop: string[];
  value?: string;
  multiple?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  onChange?: ({ ...event }) => void;
  onBlur?: FocusEventHandler<HTMLSelectElement>;
}

export default function Select(props: Props) {
  return (
    <select
      id="select-component"
      className={`${props.fullWidth ? "select__fullWidth" : undefined} select`}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      multiple={props.multiple}
      disabled={props.disabled}
      onBlur={props.onBlur}
    >
      <option className="select__option" value="" disabled />
      {props.listDrop.map((option, key) => (
        <option className="select__option" key={key}>
          {option}
        </option>
      ))}
    </select>
  );
}
