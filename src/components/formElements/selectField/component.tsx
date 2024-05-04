import CustomSelect, { Props as SelectProps } from "components/select";
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
      SelectProps,
      | "value"
      | "name"
      | "fullWidth"
      | "label"
      | "placeholder"
      | "classNames"
      | "required"
      | "isMulti"
      | "options"
      | "closeMenuOnSelect"
    >,
    "name"
  > {
  name: Path<T>;
  control: Control<T>;
  rules?: UseControllerProps["rules"];
  defaultValue?: UnpackNestedValue<PathValue<T, Path<T>>>;
}

export default function SelectField<FormField extends FieldValues>(
  props: Props<FormField>
) {
  const { control, name, rules, defaultValue, ...rest } = props;

  const { field, fieldState } = useController({
    control: control,
    name: name,
    rules: rules,
    defaultValue: defaultValue,
  });

  return (
    <CustomSelect
      {...field}
      {...rest}
      hasError={fieldState.invalid}
      errorMessage={fieldState.error?.message}
    />
  );
}
