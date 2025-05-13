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

import CustomSelect, { Props as SelectProps } from "@/components/select";

interface Props<T extends FieldValues>
  extends Omit<
    Pick<
      SelectProps,
      | "name"
      | "fullWidth"
      | "label"
      | "placeholder"
      | "classNames"
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
  readOnly?: boolean;
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
      required={!!rules?.required}
      hasError={fieldState.invalid}
      errorMessage={fieldState.error?.message}
    />
  );
}
