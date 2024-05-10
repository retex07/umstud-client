import Input, { Props as InputProps } from "components/input";
import React from "react";
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  UnpackNestedValue,
  useController,
  UseControllerProps,
} from "react-hook-form";

interface Props<T extends FieldValues>
  extends Omit<
    Pick<
      InputProps,
      | "id"
      | "type"
      | "readonly"
      | "disabled"
      | "fullWidth"
      | "label"
      | "placeholder"
      | "classNames"
      | "value"
      | "innerRef"
      | "textPosition"
      | "onClick"
    >,
    "name"
  > {
  name: Path<T>;
  control: Control<T>;
  rules?: UseControllerProps["rules"];
  defaultValue?: UnpackNestedValue<PathValue<T, Path<T>>>;
}

export default function Field<FormField extends FieldValues>(
  props: Props<FormField>
) {
  const { field, fieldState } = useController({
    control: props.control,
    name: props.name,
    rules: props.rules,
    defaultValue: props.defaultValue,
  });

  return (
    <Input
      readonly={props.readonly}
      classNames={props.classNames}
      placeholder={props.placeholder}
      label={props.label}
      type={props.type}
      name={field.name}
      id={props.id}
      fullWidth={props.fullWidth}
      innerRef={props.innerRef}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      onClick={props.onClick}
      hasError={fieldState.error != null}
      errorMessage={fieldState.error ? fieldState.error.message : ""}
    />
  );
}
