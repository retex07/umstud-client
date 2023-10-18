import Input, { Props as InputProps } from "components/input";
import React from "react";
import {
  Control,
  FieldValues,
  Path,
  useController,
  UseControllerProps,
} from "react-hook-form";

interface Props<T extends FieldValues>
  extends Pick<
    InputProps,
    | "id"
    | "type"
    | "readonly"
    | "disabled"
    | "fullWidth"
    | "label"
    | "placeholder"
    | "name"
  > {
  control: Control<T>;
  rules?: UseControllerProps["rules"];
}

export default function Field<FormField extends FieldValues>(
  props: Props<FormField>
) {
  const { field, fieldState } = useController({
    control: props.control,
    name: props.name as Path<FormField>,
    rules: props.rules,
  });

  return (
    <Input
      placeholder={props.placeholder}
      label={props.label}
      type={props.type}
      name={field.name}
      id={props.id}
      fullWidth={props.fullWidth}
      innerRef={field.ref}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      hasError={fieldState.error != null}
      errorMessage={fieldState.error ? fieldState.error.message : ""}
    />
  );
}
