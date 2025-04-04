import isFunction from "lodash/isFunction";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { OptionSelect as OptionSelectAd } from "@/api/ads/types";
import Button from "@/components/button";
import Field from "@/components/formElements/field";
import SelectField from "@/components/formElements/selectField";
import { getCategoriesAndTypes } from "@/store/actions/order";
import { selectCategories, selectTypes } from "@/store/selectors/order";
import { SelectOption } from "@/types/components";
import "../../../styles.scss";

interface Props {
  callback?: (data: OrdersFilters_FormData) => void;
}

export interface OrdersFilters_FormData {
  words?: string;
  type?: SelectOption[];
  category?: SelectOption[];
}

export default function OrdersFilter(props: Props) {
  const { t } = useTranslation("p_orders", {
    keyPrefix: "pages.index.filters",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesAndTypes());
  }, []);

  const dataTypesAds = useSelector(selectTypes);
  const dataCategoriesAds = useSelector(selectCategories);

  const { control, handleSubmit, formState } = useForm<OrdersFilters_FormData>({
    mode: "onSubmit",
  });

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

  return (
    <form
      className="page-orders__filters-fields"
      onSubmit={handleSubmit(onSubmitFilters)}
    >
      <Field
        classNames="page-page-orders__filters_field"
        control={control}
        name="words"
        label={t("fields.words.label")}
        placeholder={t("fields.words.placeholder")}
        readonly={formState.isSubmitting}
      />
      <SelectField
        classNames="page-page-orders__filters_field"
        name="type"
        control={control}
        options={parseValueToSelect(dataTypesAds || [])}
        label={t("fields.type.label")}
        placeholder={t("fields.type.placeholder")}
        isMulti
        readOnly={formState.isSubmitting}
      />
      <SelectField
        classNames="page-page-orders__filters_field"
        name="category"
        control={control}
        options={parseValueToSelect(dataCategoriesAds || [])}
        label={t("fields.category.label")}
        placeholder={t("fields.category.placeholder")}
        isMulti
        readOnly={formState.isSubmitting}
      />
      <Button
        classNames="page-orders__panel_btn"
        label={t("action")}
        fullWidth
        size="big"
        type="submit"
      />
    </form>
  );
}
