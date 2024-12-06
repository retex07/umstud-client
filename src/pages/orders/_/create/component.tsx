import { RegExp } from "constants/config";

import useCreateAd from "api/ads/mutations/create";
import { useCategoriesAds } from "api/ads/queries/categories";
import { useTypesAds } from "api/ads/queries/types";
import {
  AdCreate,
  AdCreate_FormBody,
  OptionSelect as OptionSelectAd,
  ValidKeysCreate,
} from "api/ads/types";
import Button from "components/button";
import Field from "components/formElements/field";
import SelectField from "components/formElements/selectField";
import TextareaField from "components/formElements/textareaField/component";
import PageLoader from "components/loaders/pageLoader";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import urls from "services/router/urls";
import { accessToken } from "store/user/user.selectors";
import { SelectOption } from "types/components";
import { checkToken } from "utils/user.utils";
import "../../styles.scss";

export default function CreateOrderPage() {
  const { t } = useTranslation("p_orders", { keyPrefix: "pages.create" });
  const { t: tRules } = useTranslation("translation", {
    keyPrefix: "form.rules",
  });

  const dateInputRef = useRef<HTMLInputElement>(null);

  const token = useSelector(accessToken);

  const history = useHistory();
  const createOrder = useCreateAd();
  const { data: dataTypesAds, isLoading: isLoadingTypesAds } =
    useCategoriesAds();
  const { data: dataCategoriesAds, isLoading: isLoadingCategoriesAds } =
    useTypesAds();

  function backToOrders() {
    history.push(urls.orders.index);
  }

  const { control, handleSubmit, formState, setError } = useForm<AdCreate>({
    mode: "onSubmit",
  });

  function onValidSubmit(data: AdCreate_FormBody) {
    const type = data.type.map((option) => option.value);
    const category = data.category.map((option) => option.value);

    createOrder.mutate(
      {
        data: {
          ...data,
          deadlineEndAt: new Date(data.deadlineEndAt).toISOString(),
          category,
          type,
        },
      },
      {
        onSuccess: () => {
          toast.success(t("notifications.success"));
          history.push(urls.orders.index);
        },
        onError: (error) => {
          const errorData = error.response?.data;
          if (errorData) {
            Object.entries(errorData).forEach(([key, value]) => {
              setError(key as ValidKeysCreate, {
                message: value[0] || "",
              });
            });
          }
        },
      }
    );
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

  function blockPrevDate() {
    if (dateInputRef.current) {
      dateInputRef.current.min = new Date().toISOString().split("T")[0]; // Устанавливаем минимальную дату
    }
  }

  if (!token) {
    checkToken(token, history);
  }

  if (isLoadingTypesAds || isLoadingCategoriesAds) {
    return <PageLoader />;
  }

  return (
    <div id="page" className="page-container">
      <div className="page-content-wrapper">
        <header className="page-orders__order-create_header">
          <h3 className="page-content-title">{t("title")}</h3>
          <span className="page-orders__actions_cancel" onClick={backToOrders}>
            {t("actions.cancel")}
          </span>
        </header>
        <form
          onSubmit={handleSubmit(onValidSubmit)}
          className="page-orders__order-create_form"
        >
          <Field
            name="title"
            control={control}
            fullWidth
            label={t("fields.title.title")}
            placeholder={t("fields.title.press")}
            readonly={formState.isSubmitting || createOrder.isLoading}
            rules={{
              required: tRules("required"),
            }}
          />
          <div className="page-orders__order-create_sub-fields">
            <SelectField
              classNames="page-orders__order-create_sub-fields_field"
              closeMenuOnSelect={false}
              name="type"
              control={control}
              options={parseValueToSelect(dataTypesAds || [])}
              label={t("fields.type.title")}
              placeholder={t("fields.type.press")}
              isMulti
              readOnly={formState.isSubmitting || createOrder.isLoading}
              rules={{
                required: tRules("required"),
              }}
            />
            <SelectField
              classNames="page-orders__order-create_sub-fields_field"
              closeMenuOnSelect={false}
              name="category"
              control={control}
              options={parseValueToSelect(dataCategoriesAds || [])}
              label={t("fields.category.title")}
              placeholder={t("fields.category.press")}
              isMulti
              readOnly={formState.isSubmitting || createOrder.isLoading}
              rules={{
                required: tRules("required"),
              }}
            />
            <Field
              innerRef={dateInputRef}
              classNames="page-orders__order-create_sub-fields_field"
              control={control}
              type="date"
              name="deadlineEndAt"
              label={t("fields.deadlineEndAt.title")}
              readonly={formState.isSubmitting || createOrder.isLoading}
              onClick={blockPrevDate}
              rules={{
                required: tRules("required"),
                pattern: {
                  value: RegExp.birth_date,
                  message: tRules(`pattern_deadlineEndAt`),
                },
              }}
            />
            <Field
              classNames="page-orders__order-create_sub-fields_field"
              control={control}
              type="number"
              name="budget"
              label={t("fields.budget.title")}
              placeholder={t("fields.budget.press")}
              readonly={formState.isSubmitting || createOrder.isLoading}
              rules={{
                required: tRules("required"),
              }}
            />
          </div>
          <TextareaField
            classNames="profile-edit__description"
            name="description"
            control={control}
            label={t("fields.description.title")}
            placeholder={t("fields.description.press")}
            readonly={formState.isSubmitting || createOrder.isLoading}
            fullWidth
            rules={{
              required: tRules("required"),
            }}
          />
          <Button
            type="submit"
            color="green"
            size="big"
            label={t("actions.submit")}
          />
        </form>
      </div>
    </div>
  );
}
