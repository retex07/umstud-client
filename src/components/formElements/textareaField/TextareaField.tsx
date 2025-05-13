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

import Textarea, { Props as TextareaProps } from "@/components/textarea";

interface Props<T extends FieldValues>
  extends Omit<
    Pick<
      TextareaProps,
      | "id"
      | "readonly"
      | "disabled"
      | "fullWidth"
      | "label"
      | "placeholder"
      | "classNames"
      | "value"
    >,
    "name"
  > {
  resize?: boolean;
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
    <Textarea
      resize={props.resize}
      readonly={props.readonly}
      classNames={props.classNames}
      placeholder={props.placeholder}
      label={props.label}
      name={field.name}
      id={props.id}
      required={!!props.rules?.required}
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
