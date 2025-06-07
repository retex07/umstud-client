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

import Checkbox from "@/components/Checkbox";
import { CheckboxProps } from "@/components/Checkbox/Checkbox";

interface Props<T extends FieldValues>
  extends Omit<CheckboxProps, "defaultValue"> {
  name: Path<T>;
  control: Control<T>;
  rules?: UseControllerProps["rules"];
  defaultValue?: UnpackNestedValue<PathValue<T, Path<T>>>;
  readOnly?: boolean;
}

export default function CheckboxField<FormField extends FieldValues>(
  props: Props<FormField>
) {
  const { control, name, rules, defaultValue, ...rest } = props;

  const { field } = useController({
    control: control,
    name: name,
    rules: rules,
    defaultValue: defaultValue,
  });

  return <Checkbox {...field} {...rest} defaultChecked={defaultValue} isControl checked={field.value} />;
}
