import Input, { Props as InputProps } from "components/input";
import Textarea from "components/textarea";
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
    >,
    "name"
  > {
  typeField?: "textarea" | "input";
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

  if (props.typeField === "textarea") {
    return (
      <Textarea
        resize={props.resize}
        classNames={props.classNames}
        placeholder={props.placeholder}
        label={props.label}
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

  return (
    <Input
      classNames={props.classNames}
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
