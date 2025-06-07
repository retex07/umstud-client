import isEqual from "lodash/isEqual";
import isFunction from "lodash/isFunction";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { OptionSelect as OptionSelectAd } from "@/api/handlers/order/types";
import Button from "@/components/button";
import CheckboxField from "@/components/formElements/checkboxField";
import Field from "@/components/formElements/field";
import SelectField from "@/components/formElements/selectField";
import { getCategoriesAndTypes } from "@/store/actions/order";
import { selectCategories, selectTypes } from "@/store/selectors/order";
import { SelectOption } from "@/types/components";
import { useQuery } from "@/utils/router";
import "../../_/styles.scss";

interface Props {
  callback?: (data: OrdersFilters_FormData) => void;
}

export interface OrdersFilters_FormData {
  words?: string;
  type?: SelectOption[];
  category?: SelectOption[];
  isViewOpenOnly?: boolean;
}

const defaultState: OrdersFilters_FormData = {
  isViewOpenOnly: true,
  category: [],
  type: [],
  words: "",
};

export default function OrdersFilter(props: Props) {
  const { t } = useTranslation("p_orders", {
    keyPrefix: "pages.index.filters",
  });

  const dispatch = useDispatch();
  const queryParams = useQuery();
  const searchType = queryParams.get("searchType");

  const dataTypesAds = useSelector(selectTypes);
  const dataCategoriesAds = useSelector(selectCategories);

  const { control, handleSubmit, formState, setValue, getValues } =
    useForm<OrdersFilters_FormData>({
      mode: "onSubmit",
    });

  const formData = getValues();
  const isDataChanged = !isEqual(formData, defaultState);

  useEffect(() => {
    dispatch(getCategoriesAndTypes());
  }, []);

  useEffect(() => {
    if (dataTypesAds?.length) {
      const type = dataTypesAds.find((type) => type.name === searchType);
      const selectTypes = type ? [{ value: type.id, label: type.name }] : [];

      onSubmitFilters({
        type: selectTypes,
        isViewOpenOnly: !type,
        category: defaultState.category,
        words: defaultState.words,
      });

      setValue("type", selectTypes);
      setValue("isViewOpenOnly", !type);
    }
  }, [searchType, dataTypesAds]);

  function onSubmitFilters(data: OrdersFilters_FormData) {
    if (isFunction(props.callback)) {
      props.callback(data);
    }
  }

  function parseValueToSelect(value: OptionSelectAd[]) {
    const options: SelectOption[] = [];
    value.forEach((option) => {
      options.push({
        value: option.id,
        label: option.name,
      });
    });
    return options;
  }

  function resetFilters() {
    // @ts-ignore
    Object.keys(defaultState).forEach((key) => setValue(key, defaultState[key]))
    onSubmitFilters(defaultState);
  }

  return (
    <form
      className="page-orders__filters-fields"
      onSubmit={handleSubmit(onSubmitFilters)}
    >
      <Field
        classNames="page-orders__filters_field"
        control={control}
        name="words"
        label={t("fields.words.label")}
        placeholder={t("fields.words.placeholder")}
        readonly={formState.isSubmitting}
        defaultValue={defaultState.words}
      />
      <SelectField
        classNames="page-orders__filters_field"
        name="type"
        control={control}
        options={parseValueToSelect(dataTypesAds || [])}
        label={t("fields.type.label")}
        placeholder={t("fields.type.placeholder")}
        isMulti
        readOnly={formState.isSubmitting}
        closeMenuOnSelect={false}
        defaultValue={defaultState.type}
      />
      <SelectField
        classNames="page-orders__filters_field"
        name="category"
        control={control}
        options={parseValueToSelect(dataCategoriesAds || [])}
        label={t("fields.category.label")}
        placeholder={t("fields.category.placeholder")}
        isMulti
        readOnly={formState.isSubmitting}
        closeMenuOnSelect={false}
        defaultValue={defaultState.category}
      />
      <CheckboxField
        control={control}
        label={t("fields.isViewOpenOnly")}
        defaultValue={defaultState.isViewOpenOnly}
        name="isViewOpenOnly"
      />
      <Button
        classNames="page-orders__panel_btn"
        label={t("action")}
        fullWidth
        size="big"
        type="submit"
      />
      {isDataChanged && (
        <Button
          classNames="page-orders__panel_btn"
          label={t("reset")}
          fullWidth
          size="big"
          isTransparent
          onClick={resetFilters}
        />
      )}
    </form>
  );
}
